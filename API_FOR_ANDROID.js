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
var updadteAUser=require('./ROUTES/ROUTES_FOR_ANDROID_APP/update_a_user');

/*routes for food */
var getAllFood= require('./ROUTES/ROUTES_FOR_ANDROID_APP/get_all_food');
var bookAFood= require('./ROUTES/ROUTES_FOR_ANDROID_APP/book_a_food')
var getBookedFood= require('./ROUTES/ROUTES_FOR_ANDROID_APP/get_user_booked_food');
/* user routes*/
app.post('/insert_user', registerUser);
app.post('/login_user', loginUser);
app.put('/update_user', updadteAUser);


/*food routes */
app.get('/get_all_foods', getAllFood)
app.post('/book_a_food', bookAFood);
app.post('/get_user_booked_food', getBookedFood);

/* UPLOAD IMAGE FOR user*/
app.use("/upload/images/users", express.static("upload/images/users"))
app.use("/upload/images/foods", express.static("upload/images/foods"))
app.use("/upload/images/movies", express.static("upload/images/movies"))
var ImagefileName = '';

var ImagefileName = '';
var storage = multer.diskStorage({
    destination: 'upload/images/users',
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname);
        ImagefileName = file.fieldname + Date.now() + extension;
        callback(null, ImagefileName);
       
    }
});


var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 10000000
    }
});

app.post('/upload/user/image', upload.single('image'), function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        image: ImagefileName

    }, null, 3));
}
)

app.listen(80);