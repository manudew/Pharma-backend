const { isEmpty } = require('../utils/is_empty');
const Joi = require('@hapi/joi');
const JWT = require('jsonwebtoken');
const conn = require('../service/db_service');
const { GET_DATA_PHARMACY, GET_PENDING_ORDER, GET_ONGOING_ORDER,GET_DRUG_DETAILS,SET_STATUS,SET_STATUS_TO_COMPLETE,DELETE_CUSTOMER,GET_PROFILE_DETAILS,UPDATE_PHARMACY_NAME} = require('../query/pharmacyData');
// const { SIGNUP_MODEL, SIGNIN_MODEL } = require('../models/signUp');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const AppError = require('../utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');

// exports.pharmacy_getData = (req, res, next)=>{
   
//    const name =req.params.uid;
   
//    conn.query(GET_DATA_PHARMACY, name, (err, result)=>{
//       if (err) {
//         console.log(err)}
//         else{
//          //   res.send(result);
//          // console.log(result);
         
//          res.header().status(200).json({
//             result: result,
//             success: true
//         })
//         }
//       });
// }


//get data for pending Order component
exports.PendingOrder = (req, res, next)=>{
   const name =req.params.pharmacy_id;
   conn.query(GET_PENDING_ORDER,name, (err, result)=>{
      if (err) {
        console.log(err)}
        else{
          //  res.send(result);
         console.log(result);
         res.header().status(200).send(result)
        }
      });
}


exports.getOrderDetails = (req, res, next)=>{
  const id = req.params.id;
  conn.query(GET_ONGOING_ORDER,Number(id), (err, result)=>{
     if (err) {
       console.log(err)}
       else{
         //  res.send(result);
        console.log(result);
        res.header().status(200).send(result)
       }
     });
}

exports.getDrugDetails = (req, res, next)=>{
  const id = req.params.pharmacy_id;
  conn.query(GET_DRUG_DETAILS,String(id), (err, result)=>{
     if (err) {
       console.log(err)}
       else{
         //  res.send(result);
        console.log(result);
        res.header().status(200).send(result)
       }
     });
}

exports.setDeliveryStatus = (req, res, next)=>{
  const id = req.params.uid;
  console.log(id);
  conn.query(SET_STATUS,Number(id), (err, result)=>{
     if (err) {
       console.log(err)}
       else{
         //  res.send(result);
        console.log("okaay");
        res.header().status(200).send({
          result : true
        })
       }
     });
}

exports.setStatus = (req, res, next)=>{
  const id = req.params.uid;
  console.log(id);
  conn.query(SET_STATUS_TO_COMPLETE,Number(id), (err, result)=>{
     if (err) {
       console.log(err)}
       else{
        res.header().status(200).send({
          result : true
        })
       }
     });
}

exports.deleteCustomer = (req, res, next)=>{
  const id = req.params.uid;
  console.log(id);
  conn.query(DELETE_CUSTOMER,Number(id), (err, result)=>{
     if (err) {
       console.log(err)}
       else{
        res.header().status(200).send({
          result : true
        })
       }
     });
}

exports.getProfileData = (req, res, next)=>{
  const id = req.params.id;
  conn.query(GET_PROFILE_DETAILS,String(id), (err, result)=>{
     if (err) {
       console.log(err)}
       else{
         //  res.send(result);
        console.log(result);
        res.header().status(200).send(result)
       }
     });
}

exports.updatePharmacyName = (req, res, next)=>{
  const id = req.params.id;
  const name =req.body.params.id;
  console.log(name); 
  console.log(id);
  conn.query(UPDATE_PHARMACY_NAME,Number(id),name, (err, result)=>{
     if (err) {
       console.log(err)}
       else{
        res.header().status(200).send({
          result : true
        })
       }
     });
}