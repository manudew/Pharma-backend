
const conn = require('../service/db_service');
const { GET_ALL_ORDERS, GET_ORDER, UPLOAD_FEEDBACK, GET_NOTIFCATION_DETAILS} = require('../query/pharmacyData');
const { isEmpty } = require('../utils/is_empty');
const AppError = require('../utils/appError');
const UserController = require("../controllers/UserController")




exports.getAllOrders = (req, res, next)=>{
    const name =req.params.pharmacy_id;
    conn.query(GET_ALL_ORDERS,name, (err, result)=>{
       if (err) {
         console.log(err)}
         else{
          //   res.send(result);
          console.log(result);
          res.header().status(200).send(result);
         }
       });
 }

exports.getOrder = (req, res, next)=>{
const pharmacy_id =req.params.pharmacy_id;
const order_id =req.params.order_id;
conn.query(GET_ORDER,[pharmacy_id,order_id], (err, result)=>{
    if (err) {
      console.log(err)}
      else{
      //   res.send(result);
      console.log(result);
      res.header().status(200).send(result);
      }
    });
}

 exports.uploadFeedback = (req, res, next) => {
  const order_id =req.params.order_id;
  const url = req.body.url;
  const total = req.body.total;
    if (isEmpty(req)) return next(new AppError("form data not found ", 400));
    conn.query(UPLOAD_FEEDBACK, [url,total,order_id], async (err, data, feilds) => {

      conn.query(GET_NOTIFCATION_DETAILS, [order_id], async (err, result, feilds)=>{

        var notificationBody = "You have received feedback report from "+ order_id + ".Please check the ongoing orders."

        UserController.sendSMSNotifications(result[0].contact_number, notificationBody)
        //UserController.sendNotifications(req.body.uid,req.body.pharmacy_id,notificationBody,"pharmacy")
    })

        if (err) return next(new AppError(err, 500));
        res.header().status(200).send({
            result: req.body,
            success: true
        });
    });
    
}