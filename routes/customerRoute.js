const express = require('express');
const customerRoute = express.Router();
const CustomerController =  require('../controllers/CustomerController');

customerRoute.post("/GetDetails",CustomerController.getCustomerDetails);


module.exports = customerRoute;

