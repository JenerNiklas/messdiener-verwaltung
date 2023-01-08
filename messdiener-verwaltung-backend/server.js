import { createWriteStream } from "fs";

import express from "express";
import helmet from 'helmet';
import dotenv from "dotenv"
import morgan from "morgan";
import cors from "cors";

import messdienerRouter from "./messdiener/index.js";
import authRouter from "./auth/index.js";

import { verifyToken } from "./middleware/auth.js";

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:4200",
                        "http://verwaltung.messdiener-vm.de",
                        "https://verwaltung.messdiener-vm.de"];

const app = express();
app.use(cors({
  origin: function(origin,callback)
  {
    if(!origin) return callback(null,true);

    if(allowedOrigins.indexOf(origin) === -1)
    {
      const msg  = "The CORS-policy for this site doesn't allow access from the specified origin.";

      return callback(new Error(msg),false);
    } 

    return callback(null,true);
  }
}));
app.use(express.json());
app.use(helmet());

const stream = createWriteStream('./access.log', { flags: 'a' });
app.use(morgan('combined', { stream }));

app.use("/api/messdiener", verifyToken, messdienerRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("listening");
});