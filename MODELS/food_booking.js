const mongoose= require('mongoose');

const foodBookingSchema= new mongoose.Schema({
    food_id:{
        type:String
    },

   food_name:{
       type:String
   },
   
    food_image:{
        type:String
    },

    food_price:{
        type:Number
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

const foodBooking= mongoose.model('food_booking',foodBookingSchema)
module.exports=foodBooking