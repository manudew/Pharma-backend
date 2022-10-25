const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GET_CONFIRMED_ORDERS_DETAILS } = require("../query/DeliveryAgentQuery");
const { GET_COMPLETED_ORDERS_DETAILS } = require("../query/DeliveryAgentQuery");
const { GET_DELIVERY_AGENT_DETAILS } = require("../query/DeliveryAgentQuery");
const { UPDATE_COMPLETED_ORDER } = require("../query/DeliveryAgentQuery");
const { GET_DELIVERY_AGENT_MODEL } = require("../models/DeliveryAgentModel");
const { GET_PHARMACY_ORDERS } = require("../query/DeliveryAgentQuery");
const { UPDATE_GET_ORDER } = require("../query/DeliveryAgentQuery");
const { GET_REGISTERED_PHARMACIES } = require("../query/DeliveryAgentQuery");
const { GET_ORDER_CUSTOMER } = require("../query/DeliveryAgentQuery");
const { UNREGISTER_FROM_PHARMACIES } = require("../query/DeliveryAgentQuery");
const { GET_ALL_PHARMACIES } = require("../query/DeliveryAgentQuery");
const { REGISTER_IN_NEW_PHARMACY } = require("../query/DeliveryAgentQuery");
const { GET_AGENT_ORDERS } = require("../query/DeliveryAgentQuery");

const UserController = require('../controllers/UserController');
const { result } = require('@hapi/joi/lib/base');
const { param } = require('../routes/parmacyOrderRoute');



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



exports.getAgentOrders = (req, res, next) => {
    try {
        conn.query(GET_AGENT_ORDERS, [req.params.id], async (err, data, feilds) => {
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

exports.getDeliveryAgentDetails = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    try {
        const { error } = GET_DELIVERY_AGENT_MODEL.validate(req.body);
        if (error) return next(new AppError(error.details[0].message, 400));

        conn.query(GET_DELIVERY_AGENT_DETAILS, [req.body.uid], async (err, data, feilds) => {
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

exports.updateCompleteOrder = (req, res, next) => {
    try {
        console.log(req.body.oid)
        conn.query(UPDATE_COMPLETED_ORDER, [req.body.oid], async (err, data, feilds) => {
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

exports.getPharacyOrders = (req, res, next) => {
    try {
        console.log(req.body.uid)
        conn.query(GET_PHARMACY_ORDERS, [req.body.uid], async (err, data, feilds) => {
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

exports.getOrder = (req, res, next) => {
    try {
        console.log(req.body.oid)
        conn.query(UPDATE_GET_ORDER, [req.body.uid, req.body.oid], async (err, data, feilds) => {
            console.log(data);


            conn.query(GET_ORDER_CUSTOMER, [req.body.oid], async (err, result, feilds)=>{

                
                var notificationBody = "Your order (ID: "+ req.body.oid + ") will be delivered by delivery agent (ID: "+ req.body.uid +"). Delivery agent contact number: "+ result[0].del_contact

                UserController.sendSMSNotifications(result[0].cus_contact, notificationBody)
                UserController.sendNotifications(req.body.uid,result[0].uid,notificationBody,"delivery")
            })
           
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

exports.getRegisteredPharmacies = (req, res, next) => {
    try {
        console.log(req.body.uid)
        conn.query(GET_REGISTERED_PHARMACIES, [req.body.uid], async (err, data, feilds) => {
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

exports.UnregisterFromPharmacy = (req, res, next) => {
    try {
        conn.query(UNREGISTER_FROM_PHARMACIES, [req.body.uid,req.body.pid], async (err, data, feilds) => {
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

exports.GetPharmaciesForRegister = (req, res, next) => {
    try {
        conn.query(GET_ALL_PHARMACIES, [req.body.uid], async (err, data, feilds) => {
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

exports.RegisterInPharmacy = (req, res, next) => {
    console.log(req.body.uid)
    console.log(req.body.pid)

    try {
        conn.query(REGISTER_IN_NEW_PHARMACY, [req.body.uid,req.body.pid], async (err, data, feilds) => {
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