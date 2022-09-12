const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GET_CONFIRMED_ORDERS_DETAILS } = require("../query/DeliveryAgentQuery");
const { GET_COMPLETED_ORDERS_DETAILS } = require("../query/DeliveryAgentQuery");

exports.getConfirmedOrdersDetails = (req, res, next) => {
    try {
        conn.query(GET_CONFIRMED_ORDERS_DETAILS, [req.body.uid], async (err, data, feilds) => {
            console.log(data);
            
            if (!data.length) {
                res.status(200).send({
                    result: "No records"
                })
            }
            else {
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

exports.getCompletedOrdersDetails = (req, res, next) => {
    try {
        conn.query(GET_COMPLETED_ORDERS_DETAILS, [req.body.uid], async (err, data, feilds) => {
            console.log(data);
            
            if (!data.length) {
                res.status(200).send({
                    result: "No records"
                })
            }
            else {
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
