
const movie = require('../../MODELS/movies');
var sortById= {_id: -1}
const upComingMovies = function(req, res){
    movie.find({
        movie_time:'Up Coming'
    }).sort(sortById).then(function(Moviesdata){
                res.send(Moviesdata);
                console.log(Moviesdata)

    })
}

module.exports= upComingMovies;