const express = require('express');

const parmacyInventoryRoute =express.Router();

const parmacyInventory_controller = require('../controllers/parmacyInventoryController');

parmacyInventoryRoute.post("/", parmacyInventory_controller.insertInventoryItem);
parmacyInventoryRoute.get("/:pharmacy_id",parmacyInventory_controller.getAllInventoryItems);

module.exports = parmacyInventoryRoute;