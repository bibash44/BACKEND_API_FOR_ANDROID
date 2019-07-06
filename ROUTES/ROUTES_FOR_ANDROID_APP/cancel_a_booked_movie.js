const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb')
var fs = require('fs')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
const movie = require('../../MODELS/movies');
const movie_booking = require('../../MODELS/movie_booking')

var cancelAMovieBooking = function (req, res) {
    var movie_id = req.body.movie_id;
    var user_id=req.body.user_id;

    
    movie_booking.deleteOne({
        movie_id: movie_id,
        user_id:user_id
    }).then(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            deleted: true
        }, null, 3))
        console.log('Movie booked deleted')
    }).catch(function () {
        res.end(JSON.stringify({
            deleted: false
        }, null, 3))
        console.log('failed to cancel movie')
    })

    movie.updateOne({ _id: new ObjectId(movie_id) }, {
        $set: {
            total_seats: +1
        }
    }).then(function () {
        console.log('seats increased')
    }).catch(function () {
        console.log('failed to increase the seats')
    })
}

module.exports = cancelAMovieBooking;