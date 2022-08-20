const express = require('express');

const router = express.Router();

const customerRoute = express.Router();

const customerController = require('../controller/CustomerController');

customerController.post('/User_SignUp');

module.exports = customerRoute;

