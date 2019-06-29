const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const multer = require('multer')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

require('./DB_CONNECTION/DB_CONNECTION');
const auth = require('./AUTH/auth')

app.use("/upload/images/users", express.static("upload/images/users"))


/* route list for android app */
var registerUser = require('./ROUTES/ROUTES_FOR_ANDROID_APP/register_user');
var loginUser= require('./ROUTES/ROUTES_FOR_ANDROID_APP/login_user')

/* user routes*/
app.post('/insert_user', registerUser);
app.post('/login_user', loginUser);

app.listen(80);