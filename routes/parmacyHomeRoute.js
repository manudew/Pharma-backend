const express = require('express');

const parmacyHomeRoute = express.Router();
const parmacyHome_controller = require('../controllers/parmacyHomeController');

parmacyHomeRoute.get("/:uid", parmacyHome_controller.pharmacy_getData);

module.exports = parmacyHomeRoute;