const express = require('express');



const parmacyOrderRoute =require('./routes/parmacyOrderRoute');





const cors = require('cors');
const bodyparser = require('body-parser');

const signupRoute = require('./routes/signupRoute');
const userRoute = require("./routes/userRoute");
const customerRoute = require("./routes/customerRoute");
const parmacyHomeRoute = require('./routes/parmacyHomeRoute');
const deliveryAgentRoute = require('./routes/deliveryAgentRoute');
const fileUpladRoute = require('./routes/fileUpload');
const pharmacyInventoryRoute = require('./routes/parmacyInventoryRoute');
const adminRoute = require('./routes/adminRoute');


const app = express();
app.use(cors());

app.use(express.json());


app.use("/Signup",signupRoute);
app.use("/User",userRoute);
app.use("/Customer",customerRoute);
app.use("/PharmacyHome",parmacyHomeRoute);
app.use("/DeliveryAgent",deliveryAgentRoute);
app.use("/PharmacyOrder",parmacyOrderRoute);
app.use("/UploadFile",fileUpladRoute);
app.use("/PharmacyInventory",pharmacyInventoryRoute);
app.use("/admin",adminRoute);




const PORT = 3000;

app.listen(PORT, () => {
    console.log(" Server running on port " + PORT);
})