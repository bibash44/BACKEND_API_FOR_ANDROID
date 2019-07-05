
const food = require('../../MODELS/food');
var sortById= {_id: -1}
const getAllFoods = function(req, res){
    food.find().sort(sortById).then(function(Foodsdata){
                res.send(Foodsdata);

    })
}

module.exports= getAllFoods;