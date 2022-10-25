const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GET_ALL_COMPLAINTS } = require("../query/AdminQuery");
const { GET_ALL_COMPLAINT_DETAILS} = require("../query/AdminQuery");
const { UPDATE_PANELTY} = require("../query/AdminQuery");
const { DELETE_USER} = require("../query/AdminQuery");
const { GET_ALL_COMPLAINT_DETAILS_OF_DELIVERY} = require("../query/AdminQuery");


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