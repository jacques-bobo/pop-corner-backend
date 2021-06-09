const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const e = require('express');

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
    "SELECT * FROM customers WHERE customerID = ?",
    [customerID] );

  return {
    data
  }
}

async function getCustomersByCity(city){ 
  const data = await db.query(
    "SELECT * FROM customers WHERE city = ?",
    [city]);

  return {
    data
  }
}

async function insertCustomer(username, email, password, city, vegetarian){ 
  
  const data = await db.query(
    "INSERT INTO customers (`customerID`, `username`, `email`, `password`, `city`, `vegetarian`) "
    + "VALUES (NULL, ?, ?, ?, ?, ? )",
    [username, email, password, city, vegetarian]);

  return {
    data
  }
}

async function authenticate(email, password){ 
  const customers = await db.query(
    "SELECT * FROM customers WHERE email = ?", [email]);
  
  if(customers.length != 0){
    let customer = customers[0];

    if(customer.password == password){
      delete customer["password"];
      return {
        email_exists: true,
        password_matches: true,
        customer
      }
    }
    else {
      return {
        email_exists: true,
        password_matches: false
      }
    }
  }
  else {
    return {
      email_exists: false,
      password_matches: false
    }
  }
}

module.exports = {
  getMultiple,
  getCustomer,
  getCustomersByCity,
  insertCustomer,
  authenticate
}