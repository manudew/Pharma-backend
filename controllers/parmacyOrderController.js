
const conn = require('../service/db_service');
const { GET_ALL_ORDERS} = require('../query/pharmacyData');




exports.getOrder = (req, res, next)=>{
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