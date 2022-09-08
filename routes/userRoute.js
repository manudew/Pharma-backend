const express = require('express');
const userRoute = express.Router();
const UserController =  require('../controllers/UserController');

userRoute.post("/GetPharmacies",UserController.getPharmacies);

module.exports = userRoute;