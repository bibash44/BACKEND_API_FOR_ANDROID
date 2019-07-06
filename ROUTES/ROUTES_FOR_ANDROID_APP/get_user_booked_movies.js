
const booking = require('../../MODELS/movie_booking');
var sortById= {_id: -1}
var getuserBookedMovie= function(req, res){
    var userId= req.body.user_id;
    booking.find({
        user_id:userId
    }).sort(sortById).then(function(userdata){
        console.log(userdata)
        res.send(userdata)
    })
}

module.exports= getuserBookedMovie;