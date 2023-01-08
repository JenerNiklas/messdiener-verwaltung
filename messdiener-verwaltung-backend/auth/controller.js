import mysql from "mysql";
import md5 from "md5";
import jwt from "jsonwebtoken";

import {dbconfig, config} from "../config/config.js";

export function login(req, res, next) {
  try {
    let {username, password} = req.body;

    const con = mysql.createConnection(dbconfig);
    const hashedPassword = md5(password.toString() + config.pwdSecret);
    const sql = "SELECT * FROM users WHERE username=? AND password=? AND confirmed=1";

    con.query(sql, [username, hashedPassword], (error, result) => {
      if(result.length) {
        const token = jwt.sign(
          {data:username},
          config.jwtSecret,
          {expiresIn: 86400});
        res.send({status: 1, data:result, token});
      } else {
        res.send({status: 0, error: "Not Authorized"});
      }
    })

  } catch(error) {
    result.send({status: 0, error});
  }
}

export function register(req, res, next) {
  try {
    let {username, password} = req.body;

    const con = mysql.createConnection(dbconfig);
    const hashedPassword = md5(password.toString() + config.pwdSecret);
    const checkUsername = "SELECT * from users WHERE username=?"; 

    con.query(checkUsername, [username] , function(error, result) {
      if(!result.length) {
        const sql = "INSERT INTO users (username, password) VALUES (?, ?);";

        con.query(sql, [username, hashedPassword], (error, result, fields) => {
          console.info(error, result);
          if(error) {
            res.send({status: 0, error});
          } else {
            res.send({status: 1, data:"Authenticated"});
          }
        });
      } else {
        res.send({status: 0, data:"Username not available"});
      }
    });
  } catch(error) {
    res.send({status: 0, error});
  }
}