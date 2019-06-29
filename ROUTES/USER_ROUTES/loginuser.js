
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors= require('cors')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


const user = require('../../MODELS/user');
var loginUSer= async  function(req, res){
    const Users= await user.checkCreditianlsDb(req.body.email, req.body.password);
    

    if(Users==null){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: Users,
        }, null, 3));
    }

    else{
        const token= await Users.generateAuthToken();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: Users,
            token:token
        }, null, 3));
    }
}

module.exports= loginUSer;


