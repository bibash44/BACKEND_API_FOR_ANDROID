const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },

    email: {
        type: String
    },

    phone: {
        type: String
    },

    password: {
        type: String
    },
    image: {
        type: String
    },
    usertype:{
        type:String
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})

userSchema.statics.checkCreditianlsDb = async (email, password) => {
    const checkLogin = await User.findOne({
        email: email,
        password: password
    })
    
    return checkLogin;
}

userSchema.methods.generateAuthToken= async function() {
    const user = this;
    const token= jwt.sign({_id : user._id.toString()}, 'thisismynewcourse')

    console.log(token);
    user.tokens= user.tokens.concat(({token:token}))

    await user.save();
    return token;

}

const User = mongoose.model('User', userSchema)
module.exports = User;