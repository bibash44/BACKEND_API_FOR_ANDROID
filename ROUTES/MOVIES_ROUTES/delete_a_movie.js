const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var fs = require('fs')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
const movie = require('../../MODELS/movies');
const movie_booking = require('../../MODELS/movie_booking')
const movie_rating = require('../../MODELS/rating')
const movie_feedback = require('../../MODELS/feedback')

var deleteAMovie = function (req, res) {
    var movie_id = req.params.id;
    console.log(movie_id)


    movie.findById(movie_id).then(function (MovieData) {
        imageName = MovieData.movie_image;
        fs.unlink('./upload/images/movies/' + imageName, function (err) {
            if (err) {
                return console.log(err)
            }

            else {
                console.log('old file unlinked')
            }
        })
    })

    movie_booking.deleteMany({
        movie_id: movie_id
    }).then(function () {
        console.log('delete from movie booking table')
    }).catch(function () {
        console.log('failed to delete from movie bookig table')
    })

    movie_rating.deleteMany({
        movie_id: movie_id
    }).then(function () {
        console.log('delete from movie rating table')
    }).catch(function () {
        console.log('failed to delete from rating bookig table')
    })

    movie_feedback.deleteMany({
        movie_id: movie_id
    }).then(function () {
        console.log('delete from movie feedback table')
    }).catch(function () {
        console.log('failed to delete from movie feedback table')
    })



    movie.findByIdAndDelete(movie_id).then(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            deleted: true
        }, null, 3))
    }).catch(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            deleted: false
        }, null, 3))
    })
}

module.exports = deleteAMovie;