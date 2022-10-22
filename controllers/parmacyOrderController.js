
const conn = require('../service/db_service');
const { GET_ALL_ORDERS, GET_ORDER} = require('../query/pharmacyData');




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