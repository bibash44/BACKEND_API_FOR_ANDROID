const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var fs= require('fs')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
const food = require('../../MODELS/food');
const food_booking= require('../../MODELS/food_booking');

var deleteAFood= function(req, res){
    var food_id= req.params.id;
    console.log(food_id)

    food.findById(food_id).then(function(FoodData){
        imageName= FoodData.food_image;
        fs.unlink('./upload/images/foods/'+imageName, function(err){
            if(err){
                return console.log(err)
            }

            else{
                console.log('old file unlinked')
            }
        })
    })

    food_booking.deleteOne({
        food_id:food_id
    }).then(function(){
        console.log('food deleted from sub table as well')
    }).catch(function(){
        console.log('failed to delete food from sub table')
    })


    food.findByIdAndDelete(food_id).then(function(){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ 
        deleted: true
     }, null, 3))
    }).catch(function(){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ 
        deleted: false
     }, null, 3))
    })
}

module.exports= deleteAFood;