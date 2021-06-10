const express = require('express');
const router = express.Router();
const db_manager = require('../services/popcorn');



/* GET popcorns */
router.get('/getall/', async function(req, res) {
  try {
    res.json(await db_manager.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting popcorns `, err.message);
    next(err);
  }
});

// Get popcorn from id
router.get('/', async function(req, res) {
  var popcornID = req.query.id;
  try {
    res.json(await db_manager.getPopcornFromID(popcornID));
  } catch (err) {
    console.error(`Error while getting this popcorn `, err.message);
    next(err);
  }
});

// Get popcorns from partnerID
router.get('/get_from_partner', async function(req, res) {
  var partnerID = req.query.id;
  try {
    res.json(await db_manager.getPopcornsFromPartnerID(partnerID));
  } catch (err) {
    console.error(`Error while getting these popcorns `, err.message);
    next(err);
  }
});

// Get popcorns from customerID
router.get('/get_from_customer', async function(req, res) {
  var customerID = req.query.customer_id;
  try {
    res.json(await db_manager.getPopcornsFromCustomer(customerID));
  } catch (err) {
    console.error(`Error while getting these popcorns `, err.message);
    next(err);
  }
});

// Get popcorns from city
router.get('/get_from_city', async function(req, res) {
  var city = req.query.city;
  try {
    res.json(await db_manager.getPopcornsFromCity(city));
  } catch (err) {
    console.error(`Error while getting these popcorns from city `+ city, err.message);
    next(err);
  }
});


// Add popcorn
router.get('/add', async function(req, res) {
  var name = req.query.name;
  var type = req.query.type;
  var nb_popcorns_remaining = req.query.nb_popcorns_remaining;
  var description = req.query.description;  
  var partnerID = req.query.partner_id;
  try {
    res.json(await db_manager.addPopcorn(name, type, nb_popcorns_remaining, description, partnerID));
  } catch (err) {
    console.error(`Error while adding this popcorn `, err.message);
    next(err);
  }
});

// Delete popcorn
router.get('/delete', async function(req, res) {
  var popcornID = req.query.popcorn_id;
  try {
    res.json(await db_manager.deletePopCorn(popcornID));
  } catch (err) {
    console.error(`Error while deleting this popcorn `, err.message);
    next(err);
  }
});

// Add customer to a popcorn
router.get('/add_customer', async function(req, res) {
  var customerID = req.query.customer_id
  var popcornID = req.query.popcorn_id;
  try {
    res.json(await db_manager.addCustomer(customerID, popcornID));
  } catch (err) {
    console.error('Error while adding : '+ customerID + ' to this popcorn  :'+ popcornID, err.message);
    next(err);
  }
});

// Set nb_remaining popcorns
router.get('/set_nb_remaining', async function(req, res) {
  var popcornID = req.query.popcorn_id;
  var nb_popcorns_remaining = req.query.nb_popcorns_remaining;
  try {
    res.json(await db_manager.setNbRemaining(popcornID, nb_popcorns_remaining));
  } catch (err) {
    console.error('Error while setting nb_remaining= '+ nb_popcorns_remaining +' of popcorn n°'+ popcornID, err.message);
    next(err);
  }
});



module.exports = router;