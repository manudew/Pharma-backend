
const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const { CHECK_EMAIL, REGISTER_DELIVERY_AGENT,REGISTER_DELIVERY_AGENT ,REGISTER_ADMIN,REGISTER_CUSTOMER,} = require('../query/signUp');
const { SIGNUP_MODEL, SIGNIN_MODEL } = require('../models/signUp');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const CLIENT_URL = "http://localhost:3000/";


exports.User_SignIn = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));

    try {
        const { error } = SIGNIN_MODEL.validate(req);
        if (error) return next(new AppError(error.details[0].message, 400));
        conn.query(CHECK_EMAIL, [req.email], async (err, data, feilds) => {
            if (err) return next(new AppError(err, 500));
            if (!data.length) return next(new AppError("Email or Password Invalid!", 401));

            const isMatched = await bcrypt.compare(req.password, data[0].password);
            if (!isMatched) return next(new AppError("Email or Password Invalid!", 401));

            const token = JWT.sign({ User_name: data[0].User_name, User_ID: data[0].User_ID }, "ucscucscucsc", { expiresIn: "1d" });

            res.header("auth-token", token).status(200).json({
                token: token
            })

        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }

}

exports.User_SignUp = (req, res, next) => {

    if (isEmpty(req.body)) return next(new AppError("form data not found ", 400));
    // res.status(200).json({
    //     data: "Hi controller"
    // });

    try {
        console.log("ggss");
        const { error } = SIGNUP_MODEL.validate(req);

        if (error) return next(new AppError(error.details[0].message, 400));

        conn.query(CHECK_EMAIL, [req.body.email], async (err, data, feilds) => {
            if (err) return next(new AppError(err, 500));
            if (data.length) return next(new AppError("Email already used!", 400));
            console.log(req.body.email);


            const salt = await bcrypt.genSalt(10);
            const hashedValue = await bcrypt.hash(req.password, salt);
            const email_token = crypto.randomBytes(64).toString('hex');

            if (req.user_type == 'customer') {
                conn.query(REGISTER_CUSTOMER, [[hashedValue, req.email, req.username, req.telephone]], (err, data, feilds) => {
                    if (err) return next(new AppError(err, 500));

                    res.status(201).json({
                        data: "User Registration Success!"
                    })
                })
            }

            else if(req.user_type == 'pharmacy') {
                conn.query(REGISTER_PHARMACY, [[hashedValue, req.email, req.username, req.telephone]], (err, data, feilds) => {
                    if (err) return next(new AppError(err, 500));

                    res.status(201).json({
                        data: "User Registration Success!"
                    })
                })
            }

            else if(req.user_type == 'delivery_agent') {
                conn.query(REGISTER_DELIVERY_AGENT, [[hashedValue, req.email, req.username, req.telephone]], (err, data, feilds) => {
                    if (err) return next(new AppError(err, 500));

                    res.status(201).json({
                        data: "User Registration Success!"
                    })
                })
            }

            else if(req.user_type == 'admin') {
                conn.query(REGISTER_ADMIN, [[hashedValue, req.email, req.username, req.telephone]], (err, data, feilds) => {
                    if (err) return next(new AppError(err, 500));

                    res.status(201).json({
                        data: "User Registration Success!"
                    })
                })
            }




        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}
