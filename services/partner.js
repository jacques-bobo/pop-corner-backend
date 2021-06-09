const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM partners LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getPartner(partnerID){ 
  const data = await db.query(
    "SELECT * FROM partners WHERE partnerID = ?",
    [partnerID] );

  return {
    data
  }
}

async function getPartnerCity(city){ 
  const data = await db.query(
    "SELECT * FROM partners WHERE city = ?",
    [city]);

  return {
    data
  }
}

async function insertPartner(username, email, password, city){ 
  
  const data = await db.query(
    "INSERT INTO partners (`partnerID`, `username`, `email`, `password`, `city`) "
    + "VALUES (NULL, ?, ?, ?, ?)",
    [username, email, password, city]);

  return {
    data
  }
}

module.exports = {
  getMultiple,
  getPartner,
  getPartnerCity,
  insertPartner
}