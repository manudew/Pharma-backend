const Joi = require('@hapi/joi');

exports.INSERT_INVENTORY_ITEM_MODEL = Joi.object({
    batch_No : Joi.string().required(),
    pharmacy_id : Joi.string().required(),
    brand_name : Joi.string().required(),
    drug_name : Joi.string().required(),
    quantity : Joi.number().integer().default(0),
    expiry_date : Joi.string().required(),
    manufacture_date : Joi.string().required(),
    licenece_No : Joi.string().required(),
    unit_price : Joi.number().integer().required(),
});
