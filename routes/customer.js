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
    res.json(await db_manager.getCustomerCity(city));
  } catch (err) {
    console.error(`Error while getting these customers `, err.message);
    next(err);
  }
});



module.exports = router;