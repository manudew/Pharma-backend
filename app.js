const express = require('express');
const signupRoute = require('./routes/signupRoute');
const cors = require('cors');
const bodyparser = require('body-parser');




const app = express();
app.use(cors());

app.use(express.json());

app.use("/Signup",signupRoute);

// app.get("/",( req,res) =>{
//     console.log(req.body);
//     res.status(200).json({
//         data: req.body
//     })
// })

const PORT = 3001;

app.listen(PORT, () => {
    console.log(" Server running on port " + PORT);
})