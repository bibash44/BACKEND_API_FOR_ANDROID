const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb')
const fs = require('fs');
var imageName = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


const movie = require('../../MODELS/movies');
const movies_feedback = require('../../MODELS/feedback');
const movies_rating = require('../../MODELS/rating');
const movies_booking = require('../../MODELS/movie_booking');

var updateMovie = function (req, res) {
    var movieName = req.body.moviename;
    var movieLanguage = req.body.movielanguage;
    var ticketPrice = req.body.ticketprice;
    var movieScreen = req.body.moviescreen;
    var movieTime = req.body.movietime;
    var movieDate = req.body.moviedate;
    var image = req.body.image;
    var mid = req.body.id;
    var totalSeats = req.body.totalseats;

    console.log(req.body)

    movie.findById(mid).then(function (MovieData) {
        imageName = MovieData.movie_image;

        if (imageName == image) {
            console.log('old movie image')
        }

        else {
            fs.unlink('./upload/images/movies/' + imageName, function (err) {
                if (err) {
                    return console.log(err)
                }

                else {
                    console.log('old file unlinked')
                }
            })
        }


    })

    movies_feedback.updateMany({ movie_id: mid }, {
        $set: {
            movie_name: movieName,
            movie_image: image,
            ticket_price: ticketPrice,
            movie_date: movieDate
        }
    }).then(function () {
        console.log('Table movies feedback also upadted')
    }).catch(function () {
        console.log('Failed to update the table movies feedback')
    })

    movies_rating.updateMany({ movie_id: mid }, {
        $set: {
            movie_name: movieName,
            movie_image: image,
            ticket_price: ticketPrice,
            movie_date: movieDate
        }
    }).then(function () {
        console.log('Table movies rating also upadted')
    }).catch(function () {
        console.log('Failed to update the table movies rating')
    })


    movies_booking.updateMany({ movie_id: mid }, {
        $set: {
            movie_name: movieName,
            movie_image: image,
            ticket_price: ticketPrice,
            movie_date: movieDate,
            movie_language: movieLanguage,
            movie_screen: movieScreen
        }
    }).then(function () {
        console.log('Table movies booking also upadted')
    }).catch(function () {
        console.log('Failed to update the table movies booking')
    })




    movie.updateOne({ _id: new ObjectId(mid) }, {
        $set: {
            moviename: movieName,
            movie_language: movieLanguage,
            ticket_price: ticketPrice,
            movie_screen: movieScreen,
            movie_time: movieTime,
            movie_date: movieDate,
            movie_image: image,
            total_seats: totalSeats
        }
    }).then(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            updated: true
        }, null, 3));
    }).catch(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            updated: false
        }, null, 3));
    })

}

module.exports = updateMovie





