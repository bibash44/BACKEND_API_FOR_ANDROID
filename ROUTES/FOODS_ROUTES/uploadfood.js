const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


const food = require('../../MODELS/food');

var uploadFood = function (req, res) {
    var foodName = req.body.foodname;
    var foodPrice = req.body.foodprice;
    var image = req.body.image;

    ADD_FOOD = new food({
        foodname: foodName,
        food_price: foodPrice,
        food_image: image
    })

    ADD_FOOD.save().then(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            registered: true
        }, null, 3));
    })
        .catch(function () {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                registered: false
            }, null, 3));
        })

}

module.exports = uploadFood;