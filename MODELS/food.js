const mongoose= require('mongoose');

const foodSchema= new mongoose.Schema({
    foodname:{
        type:String
    },
  
    food_price:{
        type:String
    }, 

   
    food_image:{
        type:String
    }

})

const food= mongoose.model('food',foodSchema)
module.exports=food