
const booking = require('../../MODELS/movie_booking');
var sortById= {_id: -1}
var getuserBookedMovie= function(req, res){
    booking.find().sort(sortById).then(function(userdata){

        res.send(userdata)
    })
}

module.exports= getuserBookedMovie;