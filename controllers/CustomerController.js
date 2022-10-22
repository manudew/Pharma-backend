const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GET_CUSTOMER_MODEL } = require("../models/CustomerModel");
const { GET_CUSTOMER_DETAILS, INSERT_ORDER,GET_ORDERS_BY_UID} = require("../query/CustomerQuery");
const { default: axios } = require('axios');
const UserController = require("../controllers/UserController");

exports.getCustomerDetails = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));

    try {
        console.log(req.body)
        // if (error) return next(new AppError(error.details[0].message, 400));
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

exports.makeOrder = (req,res,next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    console.log(req.body);
    try{
        if(req.body.is_prescription == "true"){
            var path =  req.file.destination.substring(1) + "/" + req.file.filename;

            conn.query(INSERT_ORDER,[[req.body.uid],[req.body.pharmacy_id],1,[req.body.address],path,"",[req.body.delivery]],async  (err, data, feilds) => {
                res.status(200).send({
                    success: true
                })
            });
        }
        else{
            conn.query(INSERT_ORDER,[[req.body.uid],[req.body.pharmacy_id],0,[req.body.address],NULL,[req.body.prescription],[req.body.delivery]],async  (err, data, feilds) => {
                res.status(200).send({
                    success: true
                })
            });

        }
        
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.getOrdersByUid = (req,res,next) => {
    if(isEmpty(req)) return next(new AppError("form data not found ", 400));
    try{
        conn.query(GET_ORDERS_BY_UID, [req.body.uid], async (err, data, feilds) => {
            console.log(data);
            if (data.length == false) {
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

