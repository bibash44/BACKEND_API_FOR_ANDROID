const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const ratingModel = require('../../MODELS/rating');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


var rateAMovie = function (req, res) {

    var movieId = req.body.movie_id;
    var movieLanguage = req.movie_language;
    var movieName = req.body.movie_name;
    var movieScreen = req.body.movie_screen;
    var movieImage = req.body.movie_image;
    var ticketPrice = req.body.ticket_price;
    var movieDate= req.body.movie_date;

    var rating = req.body.rating;

    var userId = req.body.user_id;
    var userName = req.body.user_name;
    var userImage = req.body.user_image;
    var userEmail = req.body.user_email
    var userPhone = req.body.user_phone;

    var ratingTime= req.body.rating_time;


    console.log(req.body);


    var ADD_RATING = new ratingModel({
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

        rating: rating,

        rating_time:ratingTime
    })


    // add rating a movie
    ADD_RATING.save().then(function () {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            rated: true
        }, null, 3));
    }).catch(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            rated: false
        }, null, 3));
    })

}

module.exports = rateAMovie;