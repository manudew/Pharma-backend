const express = require('express');

const parmacyHomeRoute = express.Router();

const parmacyHome_controller = require('../controllers/parmacyHomeController');

// parmacyHomeRoute.get("/:uid", parmacyHome_controller.pharmacy_getData);
parmacyHomeRoute.get("/:pharmacy_id", parmacyHome_controller.PendingOrder);
parmacyHomeRoute.get("/OngoingViewDetailsNoDelivery/:id", parmacyHome_controller.getOrderDetails);
parmacyHomeRoute.get("/OngoingViewDetails/:id", parmacyHome_controller.getOrderDetails);
parmacyHomeRoute.get("/PendingViewDetails/:id", parmacyHome_controller.getPendingDetails);
parmacyHomeRoute.get("/CompletedViewDetails/:id", parmacyHome_controller.getOrderDetails);
parmacyHomeRoute.get("/CompletedViewDetailsNoDelivery/:id", parmacyHome_controller.getOrderDetails);
parmacyHomeRoute.get("/OngoingViewDetailsSetDelivery/:id", parmacyHome_controller.getOrderDetails);
parmacyHomeRoute.get("/getDrugDetails/:pharmacy_id", parmacyHome_controller.getDrugDetails);
parmacyHomeRoute.get("/ChangeOngoingViewDetails/:uid", parmacyHome_controller.setDeliveryStatus);
parmacyHomeRoute.get("/ChangeOngoingViewDetailsNoDelivery/:uid", parmacyHome_controller.setStatus);
parmacyHomeRoute.get("/RejectPendingOrder/:uid", parmacyHome_controller.deleteCustomer);
parmacyHomeRoute.get("/GetProfileData/:id", parmacyHome_controller.getProfileData);
parmacyHomeRoute.get("/ChangePharmacyName/:id", parmacyHome_controller.updatePharmacyName);


module.exports = parmacyHomeRoute;