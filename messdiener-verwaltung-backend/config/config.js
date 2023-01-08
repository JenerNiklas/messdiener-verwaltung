import dotenv from "dotenv";

dotenv.config();

export const dbconfig = { 
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
};

export const config = {
  "pwdSecret" : process.env.PWD_SECRET,
  "jwtSecret" : process.env.JWT_SECRET
}