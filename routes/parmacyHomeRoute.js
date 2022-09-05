const express = require('express');

const parmacyHomeRoute = express.Router();
const parmacyHome_controller = require('../controllers/parmacyHomeController');

parmacyHomeRoute.get("/:uid", parmacyHome_controller.pharmacy_getData);
parmacyHomeRoute.get("/:pharmacy_id", parmacyHome_controller.PendingOrder);

module.exports = parmacyHomeRoute;