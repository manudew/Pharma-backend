const express = require('express');
const userRoute = express.Router();
const UserController =  require('../controllers/UserController');

userRoute.post("/GetPharmacies",UserController.getPharmacies);
userRoute.post("/GetDeliveryAgents",UserController.getDeliveryAgents);
userRoute.post("/GetOrderPlacedPharmacies",UserController.getOrderPlacedPharmacies);
userRoute.post("/updateUsername",UserController.updateUsername);
userRoute.post("/updateTelephone",UserController.updateTelephone);
userRoute.post("/updateEmail",UserController.updateEmail);
userRoute.post("/updatePassword",UserController.updatePassword);

module.exports = userRoute;