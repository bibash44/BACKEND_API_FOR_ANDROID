const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const movie = require('../../MODELS/movies');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

var selectAMovie= function(req, res){
    id= req.params.id;
    console.log(id)
    movie.findById(id).then(function(movieData){
        res.send(movieData)
    })
}

module.exports= selectAMovie;