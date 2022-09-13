const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');

const { GET_PHARMACY_MODEL } = require('../models/UserModel');
const { GET_VEIRIFIED_PHARMACIES } = require("../query/UserQuery");
const { GET_ORDER_PLACED_PHRMACIES } = require("../query/UserQuery");
const { UPDATE_USERNAME_MODEL, UPDATE_TELEPHONE_MODEL, UPDATE_EMAIL_MODEL, UPDATE_PASSWORD_MODEL } = require('../models/UserModel');
const { UPDATE_CUSTOMER_USERNAME, UPDATE_DELIVERYAGENT_USERNAME, UPDATE_ADMIN_USERNAME, UPDATE_PHARMACY_USERNAME, UPDATE_CUSTOMER_TELEPHONE, UPDATE_DELIVERYAGENT_TELEPHONE, UPDATE_PHARMACY_TELEPHONE, UPDATE_ADMIN_TELEPHONE, UPDATE_CUSTOMER_EMAIL, UPDATE_DELIVERYAGENT_EMAIL, UPDATE_PHARMACY_EMAIL, UPDATE_ADMIN_EMAIL, GET_VERIFIED_USER_BY_UID, UPDATE_PASSWORD } = require("../query/UserQuery");
const { GET_VERIFIED_USER } = require('../query/signUp');
const { GET_CUSTOMER_DETAILS } = require('../query/CustomerQuery');
const { GET_DELIVERY_AGENT_DETAILS} = require("../query/DeliveyagentQuery");
const { GET_PHARMACY_DETAILS } = require("../query/pharmacyQuery");
const { GET_ADMIN_DETAILS } = require("../query/AdminQuery");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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

exports.getOrderPlacedPharmacies = (req, res, next) => {

    try {
        conn.query(GET_ORDER_PLACED_PHRMACIES, [], async (err, data, feilds) => {
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
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));

    try {
        const { error } = UPDATE_USERNAME_MODEL.validate(req.body);
        if (error) return next(new AppError(error.details[0].message, 400));

        if (req.body.user_type == "customer") {
            conn.query(UPDATE_CUSTOMER_USERNAME, [[req.body.username], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_CUSTOMER_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send({
                        result: data
                    });
                });
            });
        }
        if (req.body.user_type == "delivery_agent") {
            conn.query(UPDATE_DELIVERYAGENT_USERNAME, [[req.body.username], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_DELIVERY_AGENT_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send({
                        result: data
                    });
                });
            });
        }
        if (req.body.user_type == "pharmacy") {
            conn.query(UPDATE_PHARMACY_USERNAME, [[req.body.username], [req.body.uid]], async (err, data, feilds) => {
                if (err) return next(new AppError(err, 500));
                conn.query(GET_PHARMACY_DETAILS, [req.body.uid], async (err, data, feilds) => {
                    res.header().status(200).send({
                        result: data
                    });
                });
            });
        }
        if (req.body.user_type == "admin") {
            conn.query(UPDATE_ADMIN_USERNAME, [[req.body.username], [req.body.uid]], async (err, data, feilds) => {
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

exports.updateTelephone = (req, res, next) => {
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));

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