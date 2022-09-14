const express = require('express');
const deliveryAgentRoute = express.Router();
const DeliveryAgentController =  require('../controllers/DeliveryAgentController');

deliveryAgentRoute.post("/GetConfirmedOrders",DeliveryAgentController.getConfirmedOrdersDetails);
deliveryAgentRoute.post("/GetCompletedOrders",DeliveryAgentController.getCompletedOrdersDetails);
deliveryAgentRoute.post("/GetDetails",DeliveryAgentController.getDeliveryAgentDetails);
deliveryAgentRoute.post("/CompleteOrder",DeliveryAgentController.updateCompleteOrder);

module.exports = deliveryAgentRoute;

