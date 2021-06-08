const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT customerID, username, email, password, city, vegetarian
    FROM customers LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getCustomer(customerID){ 
  const data = await db.query(
    `SELECT * FROM customers WHERE customerID = ` + customerID );

  return {
    data
  }
}

async function getCustomerCity(city){ 
  const data = await db.query(
    `SELECT * FROM customers WHERE city = ` + city );

  return {
    data
  }
}

module.exports = {
  getMultiple,
  getCustomer,
  getCustomerCity
}