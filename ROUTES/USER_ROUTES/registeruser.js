
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    requireTLS: true,
    auth: {
        user: 'bibashkatel4@gmail.com',
        pass: 'tejkmlnlqekzbfyq'
    }
});


const user = require('../../MODELS/user');

var registerUser = function (req, res) {
    var lowercaseEmail = req.body.email;
    var Useremail = lowercaseEmail.toLowerCase();
    var fullname = req.body.fullname;
    var phone = req.body.phone;
    var password = req.body.password;
    var usertype = "normal";

    var mailOptions = {
        from: 'bibashkatel4@gmail.com',
        to: Useremail,
        subject: 'Account Created ',
        text: '',
        html:
            '<div class="container-fluid main-container">' +
            'New Account created <br> <br>' +

            '<hr>' +

            '<h1>User Details</h1>' +
            '<hr>' +
            '<p> Name : <b>' + fullname + '</b> </p>' +
            '<p> Email : <b>' + Useremail + '</b> </p>' +
            '<p> Phone : <b>' + phone + '</b> </p>' +
            '<p> Usertype : <b>' + usertype + '</b> </p>' +

            '<footer class="conteiner-fluid no-gutters"> <br> <br> <hr>' +
            '<div class="w-100 footer-heading"> TICKET NOW &copy; Copyright all right reserved </div>' +
            '</footer>' +
            '</div>'
    };

    user.findOne({
        email: Useremail
    }).then(function (result) {

        console.log(result)

        if (result == null) {

            var ADD_NEW_USER = new user({
                fullname: fullname,
                email: Useremail,
                phone: phone,
                password: password,
                usertype: usertype
            })

            ADD_NEW_USER.save().then(function () {

                // Send mail to the user
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    registered: true
                }, null, 3));
            }).catch(function () {
                console.log('Failed')
            })

        }

        else {

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                registered: false
            }, null, 3));

        }

    })

}

module.exports = registerUser;