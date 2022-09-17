const express = require('express');
const path = require('path');
const fileUploadRoute = express.Router();
const FileUploadController = require('../controllers/FileUploadController');
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' }).single("photo");
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: './uploads/profile', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
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


// const upload = multer({storage: imageStorage})
// fileUploadRoute.post("/UploadProfilePhoto",FileUploadController.uploadProfilePhoto);
fileUploadRoute.post('/UploadProfilePhoto', imageUpload.single('profile'), (req, res) => {
    console.log(req.body);
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})





module.exports = fileUploadRoute;

