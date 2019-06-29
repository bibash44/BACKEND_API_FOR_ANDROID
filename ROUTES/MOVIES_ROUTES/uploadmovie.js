const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


const movie = require('../../MODELS/movies');

var uploadMovie =function (req, res) {
    var movieName = req.body.moviename;
    var movieLanguage = req.body.movielanguage;
    var ticketPrice = req.body.ticketprice;
    var movieScreen = req.body.moviescreen;
    var movieTime = req.body.movietime;
    var movieDate = req.body.moviedate;
    var image = req.body.image;
    var totalSeats= req.body.totalseats;

    console.log(req.body)

   

    ADD_MOVIE = new movie({
        moviename: movieName,
        movie_language: movieLanguage,
        ticket_price: ticketPrice,
        movie_screen: movieScreen,
        movie_time: movieTime,
        movie_date: movieDate,
        movie_image: image,
        total_seats:totalSeats
    })

    ADD_MOVIE.save().then(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            registered: true
        }, null, 3));
    })
    .catch(function(){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            registered: false
        }, null, 3));
    })

}

module.exports= uploadMovie;