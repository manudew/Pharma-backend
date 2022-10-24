const express = require('express');

const parmacyOrderRoute = express.Router();

const parmacyOrder_controller = require('../controllers/parmacyOrderController');

parmacyOrderRoute.get("/:pharmacy_id", parmacyOrder_controller.getOrder);

module.exports = parmacyOrderRoute;