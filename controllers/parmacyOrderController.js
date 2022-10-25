
const conn = require('../service/db_service');
const { GET_ALL_ORDERS, GET_ORDER, UPLOAD_FEEDBACK} = require('../query/pharmacyData');
const { isEmpty } = require('../utils/is_empty');
const AppError = require('../utils/appError');





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
        if (err) return next(new AppError(err, 500));
        res.header().status(200).send({
            result: req.body,
            success: true
        });
    });
    
}