const express = require('express');

const SignUpRoute = express.Router();
const SignUp_controller = require('../controllers/SignupController');
SignUpRoute.post("/",SignUp_controller.User_SignUp);
SignUpRoute.post("/SignIn",SignUp_controller.User_SignIn);
SignUpRoute.post("/VerifyOTP",SignUp_controller.Verification);

module.exports = SignUpRoute;