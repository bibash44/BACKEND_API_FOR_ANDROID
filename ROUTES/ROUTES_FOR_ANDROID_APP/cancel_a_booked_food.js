const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb')
var fs = require('fs')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
const food_booking = require('../../MODELS/food_booking')

var cancelAfoodBooking = function (req, res) {
    var food_id = req.body.food_id;
    var user_id= req.body.user_id;
    console.log(user_id)
    console.log(food_id)
    
    food_booking.deleteOne({
        food_id: food_id,
        user_id:user_id
    }).then(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            deleted: true
        }, null, 3))
        console.log('Food booked deleted')
    }).catch(function () {
        res.end(JSON.stringify({
            deleted: false
        }, null, 3))
        console.log('Failed to cancel food')
    })
}

module.exports = cancelAfoodBooking;