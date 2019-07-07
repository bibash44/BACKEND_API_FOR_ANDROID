const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb')
const fs = require('fs');
var imageName = '';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());


const user = require('../../MODELS/user');
const feedbackModel = require('../../MODELS/feedback');
const movie_booking = require('../../MODELS/movie_booking');
const food_booking = require('../../MODELS/food_booking');

var updateUser = function (req, res) {
    var fullname = req.body.fullname;
    var email = req.body.email;
    var phone = req.body.phone;
    var uid = req.body._id;
    var image = req.body.image

    console.log(req.body)

    user.findById(uid).then(function (UserData) {
        imageName = UserData.image;

        if (imageName == image) {
            console.log('old user image')
        }

        else {

            fs.unlink('./upload/images/users/' + imageName, function (err) {
                if (err) {
                    return console.log(err)
                }

                else {
                    console.log('old file unlinked')
                }
            })
        }
    })

    feedbackModel.updateMany({user_id:uid},{
        $set:{
            user_name: fullname,
            user_email: email,
            user_phone: phone,
            user_image: image
        }
    }).then(function(){
        console.log('feedback model also updated')
    }).catch(function(){
        console.log('Failed to update feedback model')
    })


    movie_booking.updateMany({user_id:uid},{
        $set:{
            user_name: fullname,
            user_email: email,
            user_phone: phone,
            user_image: image
        }
    }).then(function(){
        console.log('Movie booking model also updated')
    }).catch(function(){
        console.log('Failed to update movie booked model')
    })

    food_booking.updateMany({user_id:uid},{
        $set:{
            user_name: fullname,
            user_email: email,
            user_phone: phone,
            user_image: image
        }
    }).then(function(){
        console.log('Foodd booking model also updated')
    }).catch(function(){
        console.log('Failed to update food booked model')
    })


    user.updateOne({ _id: new ObjectId(uid) }, {
        $set: {
            fullname: fullname,
            email: email,
            phone: phone,
            image: image
        }
    }).then(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            updated: true
        }, null, 3));
    }).catch(function () {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            updated: false
        }, null, 3));
    })
}

module.exports = updateUser





