const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GET_CUSTOMER_MODEL } = require("../models/CustomerModel");
const { GET_CUSTOMER_DETAILS} = require("../query/CustomerQuery")

exports.getCustomerDetails = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    try {
        const { error } = GET_CUSTOMER_MODEL.validate(req.body);
        if (error) return next(new AppError(error.details[0].message, 400));
        conn.query(GET_CUSTOMER_DETAILS, [req.body.uid], async (err, data, feilds) => {
            if (!data.length) {
                res.status(200).send({
                    result: "No records"
                })
            }
            else{
                res.header().status(200).send(data);
            }
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

