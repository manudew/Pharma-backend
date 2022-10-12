const express = require('express');
const customerRoute = express.Router();
const path = require('path');
const multer = require('multer');

const CustomerController =  require('../controllers/CustomerController');

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: './uploads/prescription',
    filename: (req, file, cb) => {
        cb(null, Date.now()+  '-' + file.originalname)
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|pdf)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})


customerRoute.post("/GetDetails",CustomerController.getCustomerDetails);
customerRoute.post("/makeOrderPrescription",imageUpload.single('prescription'),CustomerController.makeOrder);
customerRoute.post("/makeOrder",imageUpload.none(),CustomerController.makeOrder);
customerRoute.post("/getOrdersByUid",CustomerController.getOrdersByUid);


module.exports = customerRoute;

