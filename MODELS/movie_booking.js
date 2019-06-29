const mongoose= require('mongoose');

const movieBookingSchema= new mongoose.Schema({
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

    booking_time:{
        type:String
    }
    
})

const movieBooking= mongoose.model('movie_booking',movieBookingSchema)
module.exports=movieBooking