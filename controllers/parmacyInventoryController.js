const conn = require('../service/db_service');
const { isEmpty } = require('../utils/is_empty');
const AppError = require('../utils/appError');
const cors = require('cors');

const { INSERT_INVENTORY_ITEM_MODEL } = require('../models/InventoryItem');

const { ADD_NEW_INVENTORY_ITEM } = require("../query/pharmacyData");

exports.insertInventoryItem = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    const { error } = INSERT_INVENTORY_ITEM_MODEL.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));
    conn.query(ADD_NEW_INVENTORY_ITEM, [[req.body.batch_No], [req.body.pharmacy_id],[req.body.brand_name], [req.body.drug_name],[req.body.quantity], [req.body.expiry_date],[req.body.manufacture_date], [req.body.licenece_No],[req.body.unit_price]], async (err, data, feilds) => {
        if (err) return next(new AppError(err, 500));
        res.header().status(200).send({
            result: req.body,
            success: true
        });
    });
}