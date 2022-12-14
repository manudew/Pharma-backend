const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');


const { GET_PHARMACY_MODEL } = require('../models/UserModel');
const { GET_VEIRIFIED_PHARMACIES, GET_VERIFIED_DELIVERYAGENTS } = require("../query/UserQuery");
const { GET_ORDER_PLACED_PHRMACIES } = require("../query/UserQuery");
const { UPDATE_USERNAME_MODEL, UPDATE_TELEPHONE_MODEL, UPDATE_EMAIL_MODEL, UPDATE_PASSWORD_MODEL } = require('../models/UserModel');
const { UPDATE_ADDRESS,UPDATE_ACCOUNT_NUMBER,UPDATE_CUSTOMER_USERNAME, UPDATE_DELIVERYAGENT_USERNAME, UPDATE_ADMIN_USERNAME, UPDATE_PHARMACY_USERNAME, UPDATE_CUSTOMER_TELEPHONE, UPDATE_DELIVERYAGENT_TELEPHONE, UPDATE_PHARMACY_TELEPHONE, UPDATE_ADMIN_TELEPHONE, UPDATE_CUSTOMER_EMAIL, UPDATE_DELIVERYAGENT_EMAIL, UPDATE_PHARMACY_EMAIL, UPDATE_ADMIN_EMAIL, GET_VERIFIED_USER_BY_UID, UPDATE_PASSWORD, UPDATE_ADMIN_PROFILE_PIC, UPDATE_CUSTOMER_PROFILE_PIC, UPDATE_DELIVERYAGENT_PROFILE_PIC, UPDATE_PHARMACY_PROFILE_PIC,SEND_NOTIFICATION,GET_NOTIFICATIONS,SET_VIEWED,CHECK_NOTIFICATION_VIEWED} = require("../query/UserQuery");
const { GET_VERIFIED_USER } = require('../query/signUp');
const { GET_CUSTOMER_DETAILS } = require('../query/CustomerQuery');
const { GET_DELIVERY_AGENT_DETAILS} = require("../query/DeliveyagentQuery");
const { GET_PHARMACY_DETAILS } = require("../query/pharmacyData");
const { GET_ADMIN_DETAILS } = require("../query/AdminQuery");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const axios = require("axios");
const { ExportConfigurationInstance } = require('twilio/lib/rest/bulkexports/v1/exportConfiguration');

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

exports.getDeliveryAgents = (req, res, next) => {

    try {
        conn.query(GET_VERIFIED_DELIVERYAGENTS, [], async (err, data, feilds) => {
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

exports.getOrderPlacedPharmacies = (req, res, next) => {

    try {
        conn.query(GET_ORDER_PLACED_PHRMACIES, [req.body.uid], async (err, data, feilds) => {
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

exports.updateUsername = (req, res, next) => {
    console.log("Manuka")
    console.log(req.body);
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    
    try {
        const { error } = UPDATE_USERNAME_MODEL.validate(req.body);
        if (error) return next(new AppError(error.details[0].message, 400));

        if (req.body.user_type == "customer") {
            conn.query(UPDATE_CUSTOMER_USERNAME, [[req.body.username], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_CUSTOMER_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send(req.file);
                });
            });
        }
        if (req.body.user_type == "delivery_agent") {
            conn.query(UPDATE_DELIVERYAGENT_USERNAME, [[req.body.username], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_DELIVERY_AGENT_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send(req.file);
                });
            });
        }
        if (req.body.user_type == "pharmacy") {
            conn.query(UPDATE_PHARMACY_USERNAME, [[req.body.username], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_PHARMACY_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send(req.file);
                });
            });
        }
        if (req.body.user_type == "admin") {
            conn.query(UPDATE_ADMIN_USERNAME, [[req.body.username], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_ADMIN_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send(req.file);
                });
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }

}

exports.updateTelephone = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    console.log(req.body);
    try {
        const { error } = UPDATE_TELEPHONE_MODEL.validate(req.body);
        if (error) return next(new AppError(error.details[0].message, 400));

        if (req.body.user_type == "customer") {
            conn.query(UPDATE_CUSTOMER_TELEPHONE, [[req.body.contact_number], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_CUSTOMER_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send({
                        result: data
                    });
                });
            });
        }
        if (req.body.user_type == "delivery_agent") {
            conn.query(UPDATE_DELIVERYAGENT_TELEPHONE, [[req.body.contact_number], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_DELIVERY_AGENT_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send({
                        result: data
                    });
                });
            });
        }
        if (req.body.user_type == "pharmacy") {
            conn.query(UPDATE_PHARMACY_TELEPHONE, [[req.body.contact_number], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_PHARMACY_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send({
                        result: data
                    });
                });
            });
        }
        if (req.body.user_type == "admin") {
            conn.query(UPDATE_ADMIN_TELEPHONE, [[req.body.contact_number], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_ADMIN_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send({
                        result: data
                    });
                });
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }

}
exports.updateEmail = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    try {
        const { error } = UPDATE_EMAIL_MODEL.validate(req.body);
        conn.query(GET_VERIFIED_USER, [req.body.email], async (err, data, feilds) => {
            if (err) return next(new AppError(err, 500));

            if (data.length) {
                res.header().status(200).send({
                    error: true
                });
            }
            else {
                if (req.body.user_type == "customer") {
                    conn.query(UPDATE_CUSTOMER_EMAIL, [[req.body.email], [req.body.uid]], async (err, data, feilds) => {
                        if (err) return next(new AppError(err, 500));
                        conn.query(GET_CUSTOMER_DETAILS, [req.body.uid], async (err, data, feilds) => {
                            res.header().status(200).send({
                                result: data
                            });
                        });
                    });
                }
                if (req.body.user_type == "delivery_agent") {
                    conn.query(UPDATE_DELIVERYAGENT_EMAIL, [[req.body.email], [req.body.uid]], async (err, data, feilds) => {
                        if (err) return next(new AppError(err, 500));
                        conn.query(GET_DELIVERY_AGENT_DETAILS, [req.body.uid], async (err, data, feilds) => {
                            res.header().status(200).send({
                                result: data
                            });
                        });
                    });
                }
                if (req.body.user_type == "pharmacy") {
                    conn.query(UPDATE_PHARMACY_EMAIL, [[req.body.email], [req.body.uid]], async (err, data, feilds) => {
                        if (err) return next(new AppError(err, 500));
                        conn.query(GET_PHARMACY_DETAILS, [req.body.uid], async (err, data, feilds) => {
                            res.header().status(200).send({
                                result: data
                            });
                        });
                    });
                }
                if (req.body.user_type == "admin") {
                    conn.query(UPDATE_ADMIN_EMAIL, [[req.body.email], [req.body.uid]], async (err, data, feilds) => {
                        if (err) return next(new AppError(err, 500));
                        conn.query(GET_ADMIN_DETAILS, [req.body.uid], async (err, data, feilds) => {
                            res.header().status(200).send({
                                result: data
                            });
                        });
                    });
                }

            }
        })

    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.updatePassword = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    try {
        conn.query(GET_VERIFIED_USER_BY_UID, [req.body.uid], async (err, data, feilds) => {

            const isMatched = await bcrypt.compare(req.body.current_password, data[0].password);
            if (!isMatched) return next(res.status(201).json({
                error: true
            }));

            const salt = await bcrypt.genSalt(10);
            const hashedValue = await bcrypt.hash(req.body.new_password, salt);

            conn.query(UPDATE_PASSWORD, [[hashedValue], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                res.header().status(200).send({
                    error: false
                });
            });

        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.uploadProfilepic = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    console.log(req.body.image_url);
    try {
        
        if (req.body.user_type == "customer") {
            
            conn.query(UPDATE_CUSTOMER_PROFILE_PIC, [[req.body.image_url], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                res.header().status(200).send({
                    result: "Succesfully updated"
                    
                });
            });
        }
        if (req.body.user_type == "delivery_agent") {
            
            conn.query(UPDATE_DELIVERYAGENT_PROFILE_PIC, [[req.body.image_url], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                res.header().status(200).send({
                    result: "Succesfully updated"
                });
            });
        }
        if (req.body.user_type == "pharmacy") {
            
            conn.query(UPDATE_PHARMACY_PROFILE_PIC, [[req.body.image_url], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                res.header().status(200).send({
                    result: "Succesfully updated"
                });
            });
        }
        if (req.body.user_type == "admin") {

            conn.query(UPDATE_ADMIN_PROFILE_PIC, [[req.body.image_url], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                res.header().status(200).send({
                    result: "Succesfully updated"
                });
            });
        }


    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.sendNotifications = (sender,receiver,body,status) => {

    try{
        conn.query(SEND_NOTIFICATION, [receiver, body, status, sender], async (err, data, feilds) => {

        })

    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
    
}

exports.sendSMSNotifications = (receiver,body) => {
    try{
        axios.get(`https://www.textit.biz/sendmsg?id=94765282976&pw=4772&to=${receiver}&text=${body}`).then(response => {
            console.log("Hello");
        });     
    }
    catch (err){
        res.status(500).json({
            error : err
        })
    }
}


exports.updateAccountNumber = (req, res, next) => {

    try {
        conn.query(UPDATE_ACCOUNT_NUMBER, [[req.body.account_number],[req.body.uid]], async (err, data, feilds) => {
           
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.getNotifications = (req,res,next) => {
    try{
        conn.query(GET_NOTIFICATIONS,[[req.body.uid],[req.body.uid]], async (err, data, feilds) => {
            if (err) return next(new AppError(err, 500));
            res.header().status(200).send(data);
        })     
    }
    catch (err){
        res.status(500).json({
            error : err

        })
    }
}


exports.updateAddress = (req, res, next) => {

    try {
        conn.query(UPDATE_ADDRESS, [[req.body.address],[req.body.uid]], async (err, data, feilds) => {
           
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.setNotificationViewed = (req,res,next) => {
    try{
        conn.query(SET_VIEWED,[req.body.uid], async (err, data, feilds) => {
            if (err) return next(new AppError(err, 500));
            res.header().status(200).send(data);
        })     
    }
    catch (err){
        res.status(500).json({
            error : err
        })
    }
}

exports.checkNotificationViewed = (req,res,next) => {

    try{
        conn.query(CHECK_NOTIFICATION_VIEWED,[req.body.uid], async (err, data, feilds) => {
            if(data.length){
                res.header().status(200).send({result : true});
            }
            else{
                res.header().status(200).send({result : false});
            }
        })     
    }
    catch (err){
        res.status(500).json({
            error : err
        })
    }
}


