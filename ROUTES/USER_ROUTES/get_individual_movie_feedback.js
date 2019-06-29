const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const feedback = require('../../MODELS/feedback');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

var sortById= {_id: -1}

var selectIndividualMovieFeedback= function(req, res){
    mid= req.params.id;
    console.log(id)
    feedback.find({
        movie_id:mid
    }).sort(sortById).then(function(feedbackData){
        res.send(feedbackData)
    })  
}

module.exports= selectIndividualMovieFeedback;