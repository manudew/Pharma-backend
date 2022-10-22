const express = require('express');

const parmacyInventoryRoute =express.Router();

const parmacyInventory_controller = require('../controllers/parmacyInventoryController');

parmacyInventoryRoute.post("/", parmacyInventory_controller.insertInventoryItem);
parmacyInventoryRoute.get("/:pharmacy_id",parmacyInventory_controller.getAllInventoryItems);
parmacyInventoryRoute.put("/",parmacyInventory_controller.updateInventoryItem)
parmacyInventoryRoute.delete("/:pharmacy_id/:drug_id",parmacyInventory_controller.deleteInventoryItems);

module.exports = parmacyInventoryRoute;