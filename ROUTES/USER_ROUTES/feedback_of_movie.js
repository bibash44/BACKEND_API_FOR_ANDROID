const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb')

const feedbackModel = require('../../MODELS/feedback');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


var feedbakcAMovie = function (req, res) {

    var movieId = req.body.movie_id;
    var movieLanguage = req.movie_language;
    var movieName = req.body.movie_name;
    var movieScreen = req.body.movie_screen;
    var movieImage = req.body.movie_image;
    var ticketPrice = req.body.ticket_price;
    var movieDate= req.body.movie_date;

    var feedback = req.body.feedback;

    var userId = req.body.user_id;
    var userName = req.body.user_name;
    var userImage = req.body.user_image;
    var userEmail = req.body.user_email
    var userPhone = req.body.user_phone;
    var feedbackTime= req.body.feedback_time;

    console.log(req.body);


    var ADD_FEEDBACK = new feedbackModel({
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

        feedback: feedback,
        feedback_time:feedbackTime
    })


    // add feedback a movie
    ADD_FEEDBACK.save().then(function () {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            feedbackProvided: true
        }, null, 3));
    }).catch(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            feedbackProvided: false
        }, null, 3));
    })

}

module.exports = feedbakcAMovie;