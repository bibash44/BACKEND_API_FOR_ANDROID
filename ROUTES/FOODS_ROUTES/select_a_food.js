const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const food = require('../../MODELS/food');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

var selectAFood= function(req, res){
    id= req.params.id;
    console.log(id)
    food.findById(id).then(function(foodData){
        res.send(foodData)
    })
}

module.exports= selectAFood;