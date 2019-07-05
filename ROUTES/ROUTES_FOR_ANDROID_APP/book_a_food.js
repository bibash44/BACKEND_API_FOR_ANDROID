const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb')
var nodemailer = require('nodemailer');

var d = new Date();
var am_pm = 'AM';
var year = d.getFullYear();
var month = d.getMonth() + 1;
var day = d.getDate();

var hour = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();

if (hour > 12) {
    am_pm = 'PM'
}

var fullDate = year + '/' + month + '/' + day;
var fullTime = hour + ':' + minutes + ':' + seconds + ' ' + am_pm;

var fullDateandTime = fullDate + ' at ' + fullTime;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    requireTLS:true,
    auth: {
        user: 'bibashkatel4@gmail.com',
        pass: 'tejkmlnlqekzbfyq'
    }
});


const food_booking = require('../../MODELS/food_booking');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


var BookAFood = function (req, res) {

    var foodId = req.body.food_id;
    var foodName = req.body.food_name;
    var foodImage = req.body.food_image;
    var foodPrice = req.body.food_price;

    var bookingTime = fullDateandTime;

    var userId = req.body.user_id;
    var userName = req.body.user_name;
    var userImage = req.body.user_image;
    var userEmail = req.body.user_email
    var userPhone = req.body.user_phone;

    var mailOptions = {
        from: 'bibashkatel4@gmail.com',
        to: userEmail,
        subject: 'Booking Made ',
        text: '',
        html: 
            '<div class="container-fluid main-container">' +
            'Pay cash while you reach the threatre <br> <br>' +

            '<h1>Food Details</h1>' +
            '<hr>' +
            '<p>  Food Name : <b>' + foodName + '</b> </p>' +
            '<p> Booking time : <b>' + bookingTime + '</b> </p>' +
            '<p> Food Price : <b>Rs. ' + foodPrice + '</b> </p>' +
            '<hr>'+
            

            '<h1>User Details</h1>' +
            '<hr>' +
            '<p> Name : <b>' + userName + '</b> </p>' +
            '<p> <i class="fa fa-envelope"></i> Email : <b>' + userEmail + '</b> </p>' +
            '<p> <i class="fa fa-phone"></i> Phone : <b>' + userPhone + '</b> </p>' +

            '<footer class="conteiner-fluid no-gutters"> <br> <br> <hr>' +
            '<div class="w-100 footer-heading"> TICKET NOW &copy; Copyright all right reserved </div>' +
            '</footer>' +
            '</div>' 
    };

    var ADD_BOOKING = new food_booking({
        food_id: foodId,
        food_image: foodImage,
        food_price: foodPrice,
        food_name:foodName,
        // for user
        user_id: userId,
        user_name: userName,
        user_image: userImage,
        user_phone: userPhone,
        user_email: userEmail,

        booking_time: bookingTime

    })

    console.log(req.body)



    // Booking a food
    ADD_BOOKING.save().then(function () {

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
            BookingMade: true
        }, null, 3));
    }).catch(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            BookingMade: false
        }, null, 3));
    })


}


module.exports = BookAFood;