require('dotenv').config();

const express = require("express");
const bodyParser = require('body-parser');

const sendEmailController = require('./routes/scheduleMail');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./models/index");
db.sequelize.sync();

// Route
app.use('/schedule', sendEmailController)

// Create connection
app.listen(process.env.PORT, (err) => {
    if(err){
        console.log('Not connected to PORT '+process.env.PORT);
    } else {
        console.log('Node running on port '+process.env.PORT);
    }
})