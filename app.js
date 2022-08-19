const express = require('express');
const router = require('./routes')

const app = express();

app.use(express.json());

app.use("./router",router);

app.get("/",( req,res) =>{
    console.log(req.body);
    res.status(200).json({
        data: req.body
    })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(" Server running on port " + PORT);
})