
const movie = require('../../MODELS/movies');
var sortById= {_id: -1}
const getAllMovies = function(req, res){
    movie.find().sort(sortById).then(function(Moviesdata){
                res.send(Moviesdata);

    })
}

module.exports= getAllMovies;