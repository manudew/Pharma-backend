const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const parmacyOrderRoute =require('./routes/parmacyOrderRoute');
const signupRoute = require('./routes/signupRoute');
const userRoute = require("./routes/userRoute");
const customerRoute = require("./routes/customerRoute");
const parmacyHomeRoute = require('./routes/parmacyHomeRoute');

const app = express();
app.use(cors());

app.use(express.json());

app.use("/Signup",signupRoute);
app.use("/User",userRoute);
app.use("/Customer",customerRoute);
app.use("/PharmacyHome",parmacyHomeRoute);
app.use("/PharmacyOrder",parmacyOrderRoute);
app.use("/DrugDetails",parmacyHomeRoute);
app.use("/OngoingViewDetails",parmacyHomeRoute);
app.use("/OngoingViewDetailsNoDelivery",parmacyHomeRoute);
app.use("/RejectOrder",parmacyHomeRoute);





const PORT = 3000;

app.listen(PORT, () => {
    console.log(" Server running on port " + PORT);
})