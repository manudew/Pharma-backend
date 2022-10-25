const express = require('express');
const userRoute = express.Router();
const multer = require('multer');
const path = require('path');

// const imageStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: './uploads/profile', 
//       filename: (req, file, cb) => {
//           cb(null,Date.now()+  '-' + file.originalname)
//             // file.fieldname is name of the field (image)
//             // path.extname get the uploaded file extension
//     }
// });

// const imageUpload = multer({
//     storage: imageStorage,
//     limits: {
//       fileSize: 1000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpg|pdf)$/)) { 
//          // upload only png and jpg format
//          return cb(new Error('Please upload a Image'))
//        }
//      cb(undefined, true)
//   }
// })

const UserController =  require('../controllers/UserController');

userRoute.post("/GetPharmacies",UserController.getPharmacies);
userRoute.post("/GetDeliveryAgents",UserController.getDeliveryAgents);
userRoute.post("/GetOrderPlacedPharmacies",UserController.getOrderPlacedPharmacies);
userRoute.post("/updateUsername",UserController.updateUsername);
userRoute.post("/updateTelephone",UserController.updateTelephone);
userRoute.post("/updateEmail",UserController.updateEmail);
userRoute.post("/updatePassword",UserController.updatePassword);
userRoute.post("/UploadProfilePhoto",UserController.uploadProfilepic);

module.exports = userRoute;