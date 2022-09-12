const Joi = require('@hapi/joi');

exports.UPDATE_USERNAME_MODEL = Joi.object({
    uid : Joi.string().required(),
    username : Joi.string().required(),
    user_type : Joi.string().required()
});

exports.UPDATE_TELEPHONE_MODEL = Joi.object({
    uid : Joi.string().required(),
    contact_number : Joi.string().required(),
    user_type : Joi.string().required()
});

exports.UPDATE_EMAIL_MODEL = Joi.object({
    uid : Joi.string().required(),
    email : Joi.string().email().required(),
    user_type : Joi.string().required()
})

exports.UPDATE_PASSWORD_MODEL = Joi.object({
    uid : Joi.string().required(),
    current_password : Joi.string().required(),
    new_password : Joi.string().required()
})