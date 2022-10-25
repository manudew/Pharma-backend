const express = require('express');
const deliveryAgentRoute = express.Router();
const DeliveryAgentController =  require('../controllers/DeliveryAgentController');

deliveryAgentRoute.post("/GetConfirmedOrders",DeliveryAgentController.getConfirmedOrdersDetails);
deliveryAgentRoute.post("/GetCompletedOrders",DeliveryAgentController.getCompletedOrdersDetails);
deliveryAgentRoute.post("/GetDetails",DeliveryAgentController.getDeliveryAgentDetails);
deliveryAgentRoute.post("/CompleteOrder",DeliveryAgentController.updateCompleteOrder);
deliveryAgentRoute.post("/GetPharmacyOrders",DeliveryAgentController.getPharacyOrders);
deliveryAgentRoute.post("/GetOrder",DeliveryAgentController.getOrder);
deliveryAgentRoute.post("/GetRegisteredPharmacies",DeliveryAgentController.getRegisteredPharmacies);
deliveryAgentRoute.post("/UnregisterFromPharmacy",DeliveryAgentController.UnregisterFromPharmacy);
deliveryAgentRoute.post("/GetPharmaciesForRegister",DeliveryAgentController.GetPharmaciesForRegister);
deliveryAgentRoute.post("/RegisterInPharmacy",DeliveryAgentController.RegisterInPharmacy);
deliveryAgentRoute.post("/GetAgentOrders/:id",DeliveryAgentController.getAgentOrders);



module.exports = deliveryAgentRoute;

