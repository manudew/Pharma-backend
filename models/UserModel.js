const Joi = require('@hapi/joi');

exports.GET_PHARMACY_MODEL = Joi.object({
    pharmacy_id : Joi.string().required()
})