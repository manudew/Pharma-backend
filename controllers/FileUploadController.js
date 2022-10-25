const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
// const { GET_CUSTOMER_DETAILS} = require("../query/CustomerQuery")

exports.uploadProfilePhoto = (req, res, next) => {
     console.log(req.body.body._parts);
    try {

        const fileStorageEngine = multer.diskStorage({
            destination : (req, file, cb) => {
                cb(null, '../uploads')
            },
            filename : (req, file, cb) => {
                cb(null, file.originalname)
            },
        })
        

        const upload = multer({storage: fileStorageEngine})
        app.post('/upload', upload.single('photo'), function (req, res, next) {
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

