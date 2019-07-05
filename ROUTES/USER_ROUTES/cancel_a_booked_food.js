const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
const food = require('../../MODELS/food');
const food_booking = require('../../MODELS/food_booking')

var cancelAfoodBooking = function (req, res) {
    var food_id = req.params.id;
    

    food_booking.deleteOne({
        food_id: food_id
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