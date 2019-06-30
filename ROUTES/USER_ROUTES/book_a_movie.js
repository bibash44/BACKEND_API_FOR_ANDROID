const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb')
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    requireTLS:true,
    auth: {
        user: 'bibashkatel4@gmail.com',
        pass: 'tejkmlnlqekzbfyq'
    }
});


const movie_booking = require('../../MODELS/movie_booking');
const movie = require('../../MODELS/movies')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


var BookAMovie = function (req, res) {

    var movieId = req.body.movie_id;
    var movieLanguage = req.body.movie_language;
    var movieName = req.body.movie_name;
    var movieScreen = req.body.movie_screen;
    var movieImage = req.body.movie_image;
    var ticketPrice = req.body.ticket_price;
    var movieDate= req.body.movie_date;

    var movieSeats = req.body.movie_seats;

    var bookingTime = req.body.booking_time;

    var userId = req.body.user_id;
    var userName = req.body.user_name;
    var userImage = req.body.user_image;
    var userEmail = req.body.user_email
    var userPhone = req.body.user_phone;

    console.log(movieLanguage);

    var mailOptions = {
        from: 'bibashkatel4@gmail.com',
        to: userEmail,
        subject: 'Booking Made ',
        text: '',
        html: 
            '<div class="container-fluid main-container">' +
            'Pay cash while you reach the threatre <br> <br>' +

            '<h1>Movie Details</h1>' +
            '<hr>' +
            '<p>  Movie Name : <b>' + movieName + '</b> </p>' +
            '<p> Booking time : <b>' + bookingTime + '</b> </p>' +
            '<p> Ticket Price : <b>Rs. ' + ticketPrice + '</b> </p>' +
            '<p> Movie Date : <b>' + movieDate + '</b> </p>' +
            '<p> Movie Screen : <b>' + movieScreen + '</b> </p>' +
            

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

    var ADD_BOOKING = new movie_booking({
        movie_id: movieId,
        movie_language: movieLanguage,
        movie_name: movieName,
        movie_screen: movieScreen,
        movie_image: movieImage,
        ticket_price: ticketPrice,
        movie_date:movieDate,

        // for user
        user_id: userId,
        user_name: userName,
        user_image: userImage,
        user_phone: userPhone,
        user_email: userEmail,

        booking_time: bookingTime

        // booking time
    })

    // Deceasring the seats
    movie.updateOne({ _id: new ObjectId(movieId) }, {
        $set: {
            total_seats: movieSeats - 1
        }
    }).then(function () {
        console.log('seats decreased')
    }).catch(function () {
        console.log('failed to decrease the seats')
    })


    // Booking a movie
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


module.exports = BookAMovie;