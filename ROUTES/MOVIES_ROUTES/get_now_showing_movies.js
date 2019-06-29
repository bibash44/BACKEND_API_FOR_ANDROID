
const movie = require('../../MODELS/movies');
var sortById= {_id: -1}
const getNowShowingMovies = function(req, res){
    movie.find({
        movie_time:'Now Showing'
    }).sort(sortById).then(function(Moviesdata){
                res.send(Moviesdata);
                console.log(Moviesdata)
    })
}

module.exports= getNowShowingMovies;