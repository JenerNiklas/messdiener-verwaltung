import mysql from "mysql";
import {dbconfig} from "../config/config.js";

function getAllMessdiener(response) {
  const con = mysql.createConnection(dbconfig);
  const sql = "SELECT iid, vorname, nachname, email, telefon, aktiv, neu FROM messdiener";
  
  con.query(sql, function(error, result){
    if (error)
    {
      console.info(error);
      response.end(error);
      throw(error);
    }
    response.end(JSON.stringify(result));
  });
}

function getMessdiener(response, iid) {
  const con = mysql.createConnection(dbconfig);
  const sql = "SELECT messdiener.iid AS iid, vorname, nachname, email, telefon, aktiv, neu, anmerkung FROM messdiener LEFT JOIN adressen ON messdiener.adresse=adressen.iid WHERE messdiener.iid=?";
  const placeholder = [iid];
  
  con.query(sql, placeholder, function(error, result){
    if (error)
    {
      response.end(error);
      throw(error);
    }
    response.end(JSON.stringify(result[0]));
  });
};

export function getAll(request, response) {
  getAllMessdiener(response);
};

export function getOne(request, response) {
  var iid = request.params.id;
  
  getMessdiener(response, iid);
}

export function upsert(request, response) {
  const con = mysql.createConnection(dbconfig);
  const sql = "INSERT INTO messdiener (iid, vorname, nachname, email, telefon, geschlecht, aktiv, anmerkung, neu) VALUES (?) \
               ON DUPLICATE KEY UPDATE vorname=VALUES(vorname), nachname=VALUES(nachname), email=VALUES(email), telefon=VALUES(telefon), geschlecht=VALUES(geschlecht), aktiv=VALUES(aktiv), anmerkung=VALUES(anmerkung), neu=VALUES(neu)";
  const data = request.body;
  const placeholder = [[data?.iid, data?.vorname, data?.nachname, data?.email, data?.telefon, data?.geschlecht, data?.aktiv, data?.anmerkung, data?.neu]];
    
  con.query(sql, placeholder, function(error, result){
    if (error)
    {
      response.end(error);
      throw(error);
    }
    response.end(JSON.stringify(result[0]));
  });
};

export function remove(request, response) {
  const con = mysql.createConnection(dbconfig);
  const sql = "DELETE FROM messdiener WHERE iid=?";
  const data = request.params;
  const placeholder = [data.id];
  
  con.query(sql, placeholder, function(error, result){
    if (error)
    {
      response.end(error);
      throw(error);
    }
    response.end("deleted successful");
  });
};
