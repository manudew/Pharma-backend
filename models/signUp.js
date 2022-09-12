const Joi = require('@hapi/joi');

exports.SIGNUP_MODEL = Joi.object({
   //  User_ID: Joi.string(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    password: Joi.string().min(6).required(),
    user_type: Joi.string().required(),
    telephone: Joi.number().max(10).required()
   //  User_type: Joi.string().required(),
   //  Email_verify:Joi.number().required(),
    // Email_verify_token: Joi.string().required(),
   //  Profole_picture: Joi.string(),
     
 })

 exports.SIGNIN_MODEL = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
 })