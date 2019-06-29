
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


const user = require('../../MODELS/user');

var loginUser = function (req, res) {

    var email = req.body.email;
    var password = req.body.password;

    user.find({
        email: email,
        password: password
    }).then(function (loggedInUserData) {
        console.log(loggedInUserData)
        res.send(loggedInUserData);

    }).catch(function (e) {
        console.log(e)
    })

}


module.exports = loginUser