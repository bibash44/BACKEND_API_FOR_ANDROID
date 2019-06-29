
const user = require('../../MODELS/user');
var sortById= {_id: -1}
var getAllUsers= function(req, res){
    user.find().sort(sortById).then(function(userdata){
        res.send(userdata)
    })
}

module.exports= getAllUsers;