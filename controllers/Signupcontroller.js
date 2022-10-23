const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const { CHECK_EMAIL, REGISTER_DELIVERY_AGENT, REGISTER_ADMIN, REGISTER_CUSTOMER, REGISTER_PHARMACY, VERIFY_OTP, SET_VERIFY, GET_VERIFIED_USER } = require('../query/signUp');
const { SIGNUP_MODEL, SIGNIN_MODEL } = require('../models/signUp');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserController = require("../controllers/UserController");



exports.User_SignIn = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    console.log(req.body)
    try {
        success = "";
        const { error } = SIGNIN_MODEL.validate(req.body);
        if (error) return next(new AppError(error.details[0].message, 400));
        conn.query(GET_VERIFIED_USER, [req.body.email], async (err, data, feilds) => {
            console.log(data);
            if (err) return next(new AppError(err, 500));

            if (!data.length) return next(res.status(200).json({
                success: false
            }));

            const isMatched = await bcrypt.compare(req.body.password, data[0].password);
            if (!isMatched) return next(res.status(201).json({
                success: false
            }));

            const token = JWT.sign({ User_name: data[0].username, User_email: data[0].contact_number, User_ID: data[0].uid, User_type: data[0].user_type }, "ucscucscucsc", { expiresIn: "1d" });

            res.header("auth-token", token).status(200).json({
                token: token,
                success: true
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

    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    // res.status(200).json({
    //     data: "Hi controller"
    // });

    try {

        console.log(req.body);
        const { error } = SIGNUP_MODEL.validate(req);

        // if (error) return next(new AppError(error.details[0].message, 400));

        conn.query(CHECK_EMAIL, [req.body.email], async (err, data, feilds) => {

            if (err) return next(new AppError(err, 500));
            if (data.length) return next(res.status(200).json({

                success: false,
                data: data
            }));

            const salt = await bcrypt.genSalt(10);
            const otp = Math.floor(100000 + Math.random() * 900000);
            const hashedValue = await bcrypt.hash(req.body.password, salt);
            const email_token = crypto.randomBytes(64).toString('hex');
            const default_profilepic_customer = 'https://firebasestorage.googleapis.com/v0/b/pharma-file.appspot.com/o/avatar-gcd60d8f1f_1280.png?alt=media&token=f1908105-ab3a-4663-91e8-1f7e75268def';
            const default_profilepic_pharmacy = 'https://firebasestorage.googleapis.com/v0/b/pharma-file.appspot.com/o/TINYPH~1.JPG?alt=media&token=f36ae662-b908-4234-bde6-2303df78b252';

            if (req.body.user_type == 'Customer') {

                conn.query(REGISTER_CUSTOMER, [[req.body.username, req.body.email, hashedValue, req.body.contact_number, default_profilepic_customer, otp]], (err, data, feilds) => {
                    if (err) return next(new AppError(err, 500));
                    UserController.sendSMSNotifications(req.body.contact_number,`Thank you for signing up. Here is your verification OTP: ${otp}`);
                    res.status(200).json({
                        success: true,
                        email: req.body.email,
                    })
                })
            }

            else if (req.body.user_type == 'pharmacy') {

                conn.query(REGISTER_PHARMACY, [[req.body.username, req.body.email, req.body.address, hashedValue, req.body.telephone, default_profilepic_pharmacy, req.body.regNo, req.body.bName, req.body.accNo, null, null, 1, otp]], (err, data, feilds) => {
                    if (err) return next(new AppError(err, 500));
                    UserController.sendSMSNotifications(req.body.contact_number,`Thank you for signing up. Here is your verification OTP: ${otp}`);

                    res.status(200).json({
                        success: true,
                        email: req.body.email
                    })

                })
            }

            else if (req.body.user_type == 'Delivery agent') {
                conn.query(REGISTER_DELIVERY_AGENT, [[req.body.username, req.body.email, hashedValue, req.body.contact_number, default_profilepic_customer, otp]], (err, data, feilds) => {
                    if (err) return next(new AppError(err, 500));
                    UserController.sendSMSNotifications(req.body.contact_number,`Thank you for signing up. Here is your verification OTP: ${otp}`);

                    res.status(200).json({
                        success: true,
                        email: req.body.email
                    })
                })
            }

            else if (req.body.user_type == 'admin') {
                conn.query(REGISTER_ADMIN, [[req.body.username, req.body.email, hashedValue, req.body.contact_number, default_profilepic_customer, otp]], (err, data, feilds) => {
                    if (err) return next(new AppError(err, 500));
                    UserController.sendSMSNotifications(req.body.contact_number,`Thank you for signing up. Here is your verification OTP: ${otp}`);
                    res.status(200).json({
                        success: true,
                        email: req.body.email
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

exports.sendEmailVerification = (email, res, next) => {
    if (isEmpty(email)) return next(new AppError("form data not found ", 400));
    console.log(email);
    try {
        conn.query(CHECK_EMAIL, [email], async (err, data, feilds) => {
            //console.log(data[0].otp);
            if (data.length) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'thephenomenalmsd@gmail.com',
                        pass: 'hywebvttfzxrnaex'
                    }
                });

                var mailOptions = {
                    from: 'thephenomenalmsd@gmail.com',
                    to: email,
                    subject: 'Verification Email',
                    html: `<html>
                <head>
                  <style type="text/css">
                    .ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td,img {line-height: 100%;}#outlook a {padding: 0;}.ExternalClass,.ReadMsgBody {width: 100%;}a,blockquote,body,li,p,table,td {-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;}table,td {mso-table-lspace: 0;mso-table-rspace: 0;}img {-ms-interpolation-mode: bicubic;border: 0;height: auto;outline: 0;text-decoration: none;}table {border-collapse: collapse !important;}#bodyCell,#bodyTable,body {height: 100% !important;margin: 0;padding: 0;font-family: ProximaNova, sans-serif;}#bodyCell {padding: 20px;}#bodyTable {width: 600px;}@font-face {font-family: ProximaNova;src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot);src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot?#iefix)format("embedded-opentype"),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.woff) format("woff");font-weight: 400;font-style: normal;}@font-face {font-family: ProximaNova;src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot);src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot?#iefix)format("embedded-opentype"),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.woff) format("woff");font-weight: 600;font-style: normal;}@media only screen and (max-width: 480px) {#bodyTable,body {width: 100% !important;}a,blockquote,body,li,p,table,td {-webkit-text-size-adjust: none !important;}body {min-width: 100% !important;}#bodyTable {max-width: 600px !important;}#signIn {max-width: 280px !important;}}
                  </style>
                </head>
                <body>
                  <center>
                    <table
                      style='width: 600px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;font-family: "ProximaNova", sans-serif;border-collapse: collapse !important;height: 100% !important;'
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      height="100%"
                      width="100%"
                      id="bodyTable"
                    >
                      <tr>
                        <td
                          align="center"
                          valign="top"
                          id="bodyCell"
                          style='-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 20px;font-family: "ProximaNova", sans-serif;height: 100% !important;'
                        >
                          <div class="main">
                            <p
                              style="text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%; margin-bottom: 30px;"
                            >
                              <img
                                src="https://i.im.ge/2022/08/20/ODU6XF.PNG-1.png"
                                width="200"
                                height: "200"
                                alt="Your logo goes here"
                                style="-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"
                              />
                            </p>
              
                            <h1>Welcome to Pharma online medicines ordering application!</h1>
              
                            <p>Thank you for signing up. Here is your verification OTP:</p>
              
                            <h2>`+ data[0].otp + `<h2>
              
                            <p>
                              If you are having any issues with your account, please don’t hesitate to contact us by replying to
                              this mail.
                            </p>
              
                            <br />
                            Thanks!
                            <br />
              
                            <strong>Pharma web and mobile application</strong>
              
                            <br /><br />
                            <hr style="border: 2px solid #EAEEF3; border-bottom: 0; margin: 20px 0;" />
                            <p style="text-align: center;color: #A9B3BC;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">
                              If you did not make this request, please contact us by replying to this mail.
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </center>
                </body>
              </html>`
                }

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }


                });
            }
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }

}

exports.Verification = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    console.log(req.body);
    try {
        conn.query(VERIFY_OTP, [req.body.otp], async (err, data, feilds) => {
            console.log(data);
            if (!data.length) {
                res.status(201).json({
                    success: false
                });
            }
            else {

                conn.query(SET_VERIFY, [req.body.otp], (err, data, feilds) => {
                    if (err) return next(new AppError(err, 500));

                    res.status(201).json({
                        success: true
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
