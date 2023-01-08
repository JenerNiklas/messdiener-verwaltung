import jwt from "jsonwebtoken";
import {config} from "../config/config.js"

export function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    const token = JSON.parse(req.headers.authorization)
    jwt.verify(token, config.jwtSecret, function (err, decoded) {
      if(decoded){
        req.user = decoded.data;
        next();
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    });
  }
}