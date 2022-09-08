const Joi = require('@hapi/joi');

exports.GET_CUSTOMER_MODEL = Joi.object({
    uid : Joi.string().required()
})