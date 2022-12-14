const express = require('express');

const parmacyInventoryRoute =express.Router();

const parmacyInventory_controller = require('../controllers/parmacyInventoryController');

parmacyInventoryRoute.post("/", parmacyInventory_controller.insertInventoryItem);
parmacyInventoryRoute.get("/:pharmacy_id",parmacyInventory_controller.getAllInventoryItems);
parmacyInventoryRoute.get("/:pharmacy_id/lowest",parmacyInventory_controller.getLowestInventoryItems);
parmacyInventoryRoute.put("/",parmacyInventory_controller.updateInventoryItem)
parmacyInventoryRoute.delete("/:pharmacy_id/:drug_id",parmacyInventory_controller.deleteInventoryItems);
parmacyInventoryRoute.put("/reduce_quantity",parmacyInventory_controller.reduceQuantity);
parmacyInventoryRoute.put("/add_quantity",parmacyInventory_controller.addQuantity);

module.exports = parmacyInventoryRoute;