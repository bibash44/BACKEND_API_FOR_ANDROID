const mongoose= require('mongoose');

const movieSchema= new mongoose.Schema({
    moviename:{
        type:String
    },

    movie_language:{
        type:String
    },

    ticket_price:{
        type:Number
    }, 

    movie_screen:{
        type:String
    },
    movie_time:{
        type:String
    },

    movie_date:{
        type:String
    },
    movie_image:{
        type:String
    },
    total_seats:{
        type:Number
    }

})

const movie= mongoose.model('movie',movieSchema)
module.exports=movie