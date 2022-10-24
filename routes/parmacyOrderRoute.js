const express = require('express');
const multer = require('multer');


const parmacyOrderRoute = express.Router();

const parmacyOrder_controller = require('../controllers/parmacyOrderController');

// const pdfStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: './uploads/feedback',
//     filename: (req, file, cb) => {
//         cb(null, Date.now()+  '-' + file.originalname)
//         // file.fieldname is name of the field (image)
//         // path.extname get the uploaded file extension
//     }
// });
// const pdfUpload = multer({
//     storage: pdfStorage,
//     limits: {
//         fileSize: 10000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(pdf)$/)) {
//             // upload only png and jpg format
//             return cb(new Error('Please upload a pdf'))
//         }
//         cb(undefined, true)
//     }
// })

parmacyOrderRoute.get("/:pharmacy_id", parmacyOrder_controller.getAllOrders);
parmacyOrderRoute.get("/:pharmacy_id/:order_id", parmacyOrder_controller.getOrder);
parmacyOrderRoute.put("/feedback/:pharmacy_id/:order_id", parmacyOrder_controller.uploadFeedback);


module.exports = parmacyOrderRoute;