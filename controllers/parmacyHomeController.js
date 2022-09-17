const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const { GET_DATA_PHARMACY, GET_PENDING_ORDER } = require('../query/pharmacyData');
// const { SIGNUP_MODEL, SIGNIN_MODEL } = require('../models/signUp');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');

exports.pharmacy_getData = (req, res, next)=>{
   
   const name =req.params.uid;
   
   conn.query(GET_DATA_PHARMACY, name, (err, result)=>{
      if (err) {
        console.log(err)}
        else{
         //   res.send(result);
         // console.log(result);
         
         res.header().status(200).json({
            result: result,
            success: true
        })
        }
      });
}


//get data for pending Order component
exports.PendingOrder = (req, res, next)=>{
   const name =req.params.pharmacy_id;
   conn.query(GET_PENDING_ORDER,name, (err, result)=>{
      if (err) {
        console.log(err)}
        else{
         //   res.send(result);
         // console.log(result);
         res.header().status(200).send(result)
        }
      });
}