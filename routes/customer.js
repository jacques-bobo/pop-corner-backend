const express = require('express');
const router = express.Router();
const db_manager = require('../services/customer');



/* GET customers */
router.get('/getall/', async function(req, res) {
  try {
    res.json(await db_manager.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting customers `, err.message);
    next(err);
  }
});

// Get customer from id
router.get('/', async function(req, res) {
  var customerID = req.query.id;
  try {
    res.json(await db_manager.getCustomer(customerID));
  } catch (err) {
    console.error(`Error while getting this customer `, err.message);
    next(err);
  }
});

// Get customers from city
router.get('/get_from_city', async function(req, res) {
  var city = req.query.city;
  try {
    res.json(await db_manager.getCustomersByCity(city));
  } catch (err) {
    console.error(`Error while getting these customers `, err.message);
    next(err);
  }
});

// Add customer
router.get('/insert', async function(req, res) {
  var username = req.query.username;
  var email = req.query.email;
  var password = req.query.password;
  var city = req.query.city;
  var vegetarian = req.query.vegetarian;
  try {
    res.json(await db_manager.insertCustomer(username, email, password, city, vegetarian));
  } catch (err) {
    console.error(`Error while adding this customers `, err.message);
    next(err);
  }
});

router.post('/insert', async function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var city = req.body.city;
  var vegetarian = req.body.vegetarian;
  try {
    res.json(await db_manager.insertCustomer(username, email, password, city, vegetarian));
  } catch (err) {
    console.error(`Error while adding this customers `, err.message);
    next(err);
  }
});

// Authenticate customer
router.get('/authenticate', async function(req, res) {
  var email = req.query.email;
  var password = req.query.password;
  try {
    res.json(await db_manager.authenticate(email, password));
  } catch (err) {
    console.error(`Error while authenticating this customer `, err.message);
    next(err);
  }
});


module.exports = router;