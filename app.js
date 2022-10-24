const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const parmacyOrderRoute =require('./routes/parmacyOrderRoute');
const signupRoute = require('./routes/signupRoute');
const userRoute = require("./routes/userRoute");
const customerRoute = require("./routes/customerRoute");
const parmacyHomeRoute = require('./routes/parmacyHomeRoute');
const deliveryAgentRoute = require('./routes/deliveryAgentRoute');
const stripeRoute = require('./routes/stripeRoute');
const fileUpladRoute = require('./routes/fileUpload');
const pharmacyInventoryRoute = require('./routes/parmacyInventoryRoute');


const app = express();
app.use(cors());

app.use(express.json());


app.use("/Signup",signupRoute);
app.use("/User",userRoute);
app.use("/Customer",customerRoute);
app.use("/PharmacyHome",parmacyHomeRoute);
app.use("/DeliveryAgent",deliveryAgentRoute);
app.use("/PharmacyOrder",parmacyOrderRoute);
app.use("/Stripe",stripeRoute);
app.use("/DrugDetails",parmacyHomeRoute);
app.use("/OngoingViewDetails",parmacyHomeRoute);
app.use("/OngoingViewDetailsNoDelivery",parmacyHomeRoute);
app.use("/RejectOrder",parmacyHomeRoute);
app.use("/UploadFile",fileUpladRoute);
app.use("/PharmacyInventory",pharmacyInventoryRoute);





const PORT = 3001;

app.listen(PORT, () => {
    console.log(" Server running on port " + PORT);
})

