const Joi = require('@hapi/joi');

exports.GET_DELIVERY_AGENT_MODEL = Joi.object({
    uid : Joi.string().required()
})