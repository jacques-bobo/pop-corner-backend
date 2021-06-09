const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const customer = require('./customer');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM popcorns LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getPopcornFromID(popcornID){ 
  const data = await db.query(
    `SELECT * FROM popcorns WHERE popcornID = ?`,
    [popcornID] );

  return {
    data
  }
}

async function getPopcornsFromPartnerID(partnerID){ 
  const data = await db.query(
    "SELECT * FROM popcorns WHERE partnerID = ?",
    [partnerID] );

  return {
    data
  }
}

async function getPopcornsFromCustomer(customerID){ 
  const data = await db.query(
    "SELECT p.* FROM customer_popcorn cp JOIN popcorns p ON cp.popcornID = p.popcornID "+
    "WHERE cp.customerID = ?",
    [customerID]);

  return {
    data
  }
}

async function addPopcorn(name, type, nb_customers, description, partnerID){ 
  
  const data = await db.query(
    "INSERT INTO popcorns (`popcornID`, `name`, `type`, `nb_customers`, `description`, `partnerID`) "
    + "VALUES (NULL, ?, ?, ?, ?, ?)",
    [name, type, nb_customers, description, partnerID] );

  resultSendEmails = await sendEmailsToCustomers(name, type, nb_customers, description, partnerID, data.insertId);
  return {
    data,resultSendEmails
  }
}

async function sendEmailsToCustomers(name, type, nb_customers, description, partnerID, popcornID){ 
  //await helper.sendEmail("jacquesbonnand@yahoo.fr", 3, 5);
  const partner = await db.query(
    `SELECT * FROM partners WHERE partnerID = ` + partnerID );
  const customers = await customer.getCustomersByCity(partner[0].city);
  
  customers_shuffled_list = await helper.shuffle(customers.data);

  // We take the first 10 customers from the shuffled list
  for (var c of customers_shuffled_list.slice(0,9)){
    console.log(c.email);

    var validation_link = "http://localhost:3000/popcorn/add_customer?"
    + "customer_id="+ c.customerID
    + "&popcorn_id="+ popcornID;

    const subject = 'You have a new popcorn offer ! - PopCorner';
    const message = "Dear "+ c.username +", here is your popcorn offer in your city : "+ c.city + "! "+
    "\nRestaurant : "+ partner[0].username +
    "\nPopcorn name : "+ name +
    "\nRestaurant type : "+ type +
    "\nDescription : "+ description +
    "\n\nTo confirm your popcorn, please click on this link : "+ validation_link;

    await helper.sendEmail(c.email, subject, message);
  }
  console.log(customers_shuffled_list);

  return {
    customers_sent_popcorn: customers_shuffled_list.slice(0,9)
  }
}

async function incrementNbCustomers(popcornID){ 
  const data = await db.query(
    "UPDATE popcorns SET nb_customers = nb_customers + 1 WHERE popcornID = ?",
    [popcornID] );

  return {
    data
  }
}

async function resetNbCustomers(popcornID){ 
  const data = await db.query(
    "UPDATE popcorns SET nb_customers = 0 WHERE popcornID = ?",
    [popcornID] );

  return {
    data
  }
}

async function deletePopCorn(popcornID){ 
  const data = await db.query(
    "DELETE FROM `popcorns` WHERE `popcorns`.`popcornID` = ?",
      [popcornID] );

  return {
    data
  }
}

async function addCustomer(customerID, popcornID){ 
  
  const customer_popcorns = await getPopcornsFromCustomer(customerID);
  for (var popcorn of customer_popcorns.data){
    if (popcorn.popcornID == popcornID){
      return {"error": "This popcorn has already been added by the customer"}
    }
  }
  console.log(customer_popcorns)
  
  const data = await db.query(
    "INSERT INTO customer_popcorn (`customerID`, `popcornID`, `id`) VALUES (?, ?, NULL);",
     [customerID, popcornID] );

  await incrementNbCustomers(popcornID)
  return {
    data
  }
}



module.exports = {
  getMultiple,
  getPopcornFromID,
  getPopcornsFromPartnerID,
  addPopcorn,
  deletePopCorn,
  addCustomer,
  getPopcornsFromCustomer,
  resetNbCustomers
}