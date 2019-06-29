const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb')
const fs = require('fs');
var imageName = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


const food = require('../../MODELS/food');
const food_booking = require('../../MODELS/food_booking')

var updateFood = function (req, res) {
    var foodName = req.body.foodname;
    var foodPrice = req.body.foodprice;
    var image = req.body.image;
    var fid = req.body.id;

    food.findById(fid).then(function (FoodData) {
        imageName = FoodData.food_image;

        if (imageName == image) {
            console.log('old image')
        }

        else {

            fs.unlink('./upload/images/foods/' + imageName, function (err) {
                if (err) {
                    return console.log(err)
                }

                else {
                    console.log('old file unlinked')
                }
            })

        }
    })

    food_booking.update({ food_id: fid }, {
        $set: {
            food_name: foodName,
            food_price: foodPrice,
            food_image: image
        }
    }).then(function () {
        console.log('Food booking table also updated')
    }).catch(function () {
        console.log('Failed to updated food booking table')
    })

    food.updateOne({ _id: new ObjectId(fid) }, {
        $set: {
            foodname: foodName,
            food_price: foodPrice,
            food_image: image
        }
    }).then(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            updated: true
        }, null, 3));
    }).catch(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            updated: false
        }, null, 3));
    })

}

module.exports = updateFood





