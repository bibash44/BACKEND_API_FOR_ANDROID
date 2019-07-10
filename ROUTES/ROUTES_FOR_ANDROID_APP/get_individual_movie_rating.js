const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const rating = require('../../MODELS/rating');

var sortById= {_id: -1}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

var selectIndividualMovierating= function(req, res){
    mid= req.body.movie_id;

    rating.find({
        movie_id:mid
    }).sort(sortById).then(function(ratingData){
        res.send(ratingData)
    })  
}

module.exports= selectIndividualMovierating;