const express = require('express');

const parmacyInventoryRoute =express.Router();

const parmacyInventory_controller = require('../controllers/parmacyInventoryController');

parmacyInventoryRoute.post("/", parmacyInventory_controller.insertInventoryItem);

module.exports = parmacyInventoryRoute;