
const booking = require('../../MODELS/movie_booking');
var sortById= {_id: -1}
var getuserBookedMovie= function(req, res){
    var userId= req.params.uid;
    booking.find({
        user_id:userId
    }).sort(sortById).then(function(userdata){

        res.send(userdata)
    })
}

module.exports= getuserBookedMovie;