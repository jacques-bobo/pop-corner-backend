const express = require('express');
const router = express.Router();
const partner_service = require('../services/partner');



/* GET partners */
router.get('/getall/', async function(req, res) {
  try {
    res.json(await partner_service.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting partners `, err.message);
    next(err);
  }
});

// Get partner from id
router.get('/', async function(req, res) {
  var partnerID = req.query.id;
  try {
    res.json(await partner_service.getPartner(partnerID));
  } catch (err) {
    console.error(`Error while getting this partner `, err.message);
    next(err);
  }
});

// Get partners from city
router.get('/get_from_city', async function(req, res) {
  var city = req.query.city;
  try {
    res.json(await partner_service.getPartnerCity(city));
  } catch (err) {
    console.error(`Error while getting these partners `, err.message);
    next(err);
  }
});

// Add partner
router.get('/insert', async function(req, res) {
  var username = req.query.username;
  var email = req.query.email;
  var password = req.query.password;
  var city = req.query.city;
  try {
    res.json(await partner_service.insertPartner(username, email, password, city));
  } catch (err) {
    console.error(`Error while getting these partners `, err.message);
    next(err);
  }
});

// Authenticate partner
router.get('/authenticate', async function(req, res) {
  var email = req.query.email;
  var password = req.query.password;
  try {
    res.json(await partner_service.authenticate(email, password));
  } catch (err) {
    console.error(`Error while authenticating this partner `, err.message);
    next(err);
  }
});


module.exports = router;