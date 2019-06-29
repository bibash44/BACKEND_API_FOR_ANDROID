
const booking = require('../../MODELS/food_booking');
var sortById= {_id: -1}
var getuserBookedFood= function(req, res){
    var userId= req.params.uid;
    booking.find({
        user_id:userId
    }).sort(sortById).then(function(userdata){

        res.send(userdata)
    })
}

module.exports= getuserBookedFood;