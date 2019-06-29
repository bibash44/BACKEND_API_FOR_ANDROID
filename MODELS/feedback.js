const mongoose= require('mongoose');

const feedbackSchema= new mongoose.Schema({
    movie_id:{
        type:String
    },

    movie_language:{
        type:String
    },

   movie_name:{
       type:String
   },

    movie_screen:{
        type:String
    },
   
    movie_image:{
        type:String
    },

    ticket_price:{
        type:Number
    },
    movie_date:{
        type:String
    },

// for user 
    user_id:{
        type:String
    },

    user_name:{
        type:String
    },

   user_image:{
       type:String
   },

    user_phone:{
        type:String
    },
   
    user_email:{
        type:String
    },

    feedback:{
        type:String
    },
    feedback_time:{
        type:String
    }
    
})

const feedbackAMovie= mongoose.model('feedback_movie',feedbackSchema)
module.exports=feedbackAMovie