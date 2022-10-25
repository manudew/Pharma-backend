const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GET_COMPLAINTS, GET_ADMIN_DETAILS, GET_PHARMACY_COUNT, GET_CUSTOMER_COUNT, GET_DELIVERY_AGENT_COUNT, GET_MONTHLY_ORDER_COUNT, GET_BEST_PHARMACIES, GET_BEST_AGENTS, GET_GRAPH_DATA} = require("../query/AdminQuery")
const { GET_ALL_COMPLAINTS } = require("../query/AdminQuery");
const { GET_ALL_COMPLAINT_DETAILS} = require("../query/AdminQuery");
const { UPDATE_PANELTY} = require("../query/AdminQuery");
const { DELETE_USER} = require("../query/AdminQuery");
const { GET_ALL_COMPLAINT_DETAILS_OF_DELIVERY} = require("../query/AdminQuery");

exports.getGraphData = (req, res, next) => {

    try {
        conn.query(GET_GRAPH_DATA, [], async (err, data, feilds) => {
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

exports.getBestAgents = (req, res, next) => {

    try {
        conn.query(GET_BEST_AGENTS, [], async (err, data, feilds) => {
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

exports.getBestPharmacies = (req, res, next) => {

    try {
        conn.query(GET_BEST_PHARMACIES, [], async (err, data, feilds) => {
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

exports.getMonthlyOrderCount = (req, res, next) => {

    try {
        conn.query(GET_MONTHLY_ORDER_COUNT, [], async (err, data, feilds) => {
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

exports.getDeliveryAgentCount = (req, res, next) => {

    try {
        conn.query(GET_DELIVERY_AGENT_COUNT, [], async (err, data, feilds) => {
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


exports.getComplaints = (req, res, next)=>{

    try {
        conn.query(GET_ALL_COMPLAINTS, [], async (err, data, feilds) => {
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

exports.getCustomerCount = (req, res, next) => {

    try {
        conn.query(GET_CUSTOMER_COUNT, [], async (err, data, feilds) => {
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

exports.getComplaintDetails = (req, res, next) => {
    const id = req.params.id;
    try {
        conn.query(GET_ALL_COMPLAINT_DETAILS, [id], async (err, data, feilds) => {
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


exports.getPharmacyCount = (req, res, next) => {

    try {
        conn.query(GET_PHARMACY_COUNT, [], async (err, data, feilds) => {
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

exports.getDeliveryComplaintDetails = (req, res, next) => {
    const id = req.params.id;
    try {
        conn.query(GET_ALL_COMPLAINT_DETAILS_OF_DELIVERY, [id], async (err, data, feilds) => {
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

// exports.getComplaints = (req, res, next) => {

//     try {
//         conn.query(GET_COMPLAINTS, [], async (err, data, feilds) => {
//             console.log(data);
//                       if (!data.length) {
//                 res.status(200).send({
//                     result: "No records"
//                 })
//             }
//             else {
//                 res.header().status(200).send(data);
//             }
//         })
//     }
//     catch (err) {
//         res.status(500).json({
//             error: err
//         })
//     }
// }

exports.updatePanelty = (req, res, next) => {
    const id = req.params.aID;
    console.log(id);
    try {
        conn.query(UPDATE_PANELTY, [id, id], async (err, data, feilds) => {
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

exports.getAdminDetails = (req, res, next) => {

    try {
        conn.query(GET_ADMIN_DETAILS, [req.body.uid], async (err, data, feilds) => {
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

exports.deleteUser = (req, res, next) => {
    const id = req.params.aID;
    try {
        conn.query(DELETE_USER, [id, id], async (err, data, feilds) => {
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