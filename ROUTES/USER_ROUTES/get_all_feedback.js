var sortById= {_id: -1}
const feedback = require('../../MODELS/feedback');
var selectIndividualMovieFeedback= function(req, res){
    
    feedback.find().sort(sortById).then(function(feedbackData){
        res.send(feedbackData)
    })  
}

module.exports= selectIndividualMovieFeedback;