var sortById= {_id: -1}
const rating = require('../../MODELS/rating');
var selectIndividualMovierating= function(req, res){
    rating.find().sort(sortById).then(function(ratingData){
        res.send(ratingData)
    })  
}

module.exports= selectIndividualMovierating;