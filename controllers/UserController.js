const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GET_PHARMACY_MODEL } = require('../models/UserModel');
const { GET_VEIRIFIED_PHARMACIES } = require("../query/UserQuery");

exports.getPharmacies = (req, res, next) => {

    try {
        conn.query(GET_VEIRIFIED_PHARMACIES, [], async (err, data, feilds) => {
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