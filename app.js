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


/*routes for user */
var registerUser = require('./ROUTES/USER_ROUTES/registeruser');
var loginUser = require('./ROUTES/USER_ROUTES/loginuser');
var getAllUsers= require('./ROUTES/USER_ROUTES/get_all_users');
var updadteAUser=require('./ROUTES/USER_ROUTES/update_a_user');
var bookAMovie= require('./ROUTES/USER_ROUTES/book_a_movie')
var rateAMovie= require('./ROUTES/USER_ROUTES/rate_a_movie')
var feedbackAMovie= require('./ROUTES/USER_ROUTES/feedback_of_movie')
var bookAFood= require('./ROUTES/USER_ROUTES/book_food')
var getIndividualMovieFeedBack=require('./ROUTES/USER_ROUTES/get_individual_movie_feedback');
var getIndividualMovieRating=require('./ROUTES/USER_ROUTES/get_individual_movie_rating');
var getUserBookedMovies= require('./ROUTES/USER_ROUTES/get_user_booked_movies');
var cancelABookedMovie= require('./ROUTES/USER_ROUTES/cancel_a_booked_movie');
var getUserBookedFoods= require('./ROUTES/USER_ROUTES/get_user_booked_food');
var cancelABookedFood= require('./ROUTES/USER_ROUTES/cancel_a_booked_food');
var getAllBookedMovies=require('./ROUTES/USER_ROUTES/get_all_booked_movies');
var getAllBookedFoods= require('./ROUTES/USER_ROUTES/get_all_booked_foods');
var getAllMovieFeedback= require('./ROUTES/USER_ROUTES/get_all_feedback');
var getAllMovieRating= require('./ROUTES/USER_ROUTES/get_all_rating');


/*routes for movies */
var uploadMovie = require('./ROUTES/MOVIES_ROUTES/uploadmovie');
var getAllMovies = require('./ROUTES/MOVIES_ROUTES/get_all_movie');
var deleteAMovie= require('./ROUTES/MOVIES_ROUTES/delete_a_movie');
var selectAMovie= require('./ROUTES/MOVIES_ROUTES/select_a_movie');
var updateMovie= require('./ROUTES/MOVIES_ROUTES/update_a_movie');
var getNowShowingMovies= require('./ROUTES/MOVIES_ROUTES/get_now_showing_movies');
var getUpComingMovies= require('./ROUTES/MOVIES_ROUTES/get_up_coming_movies_details');

/*routes for foods */
var uploadFood = require('./ROUTES/Foods_ROUTES/uploadfood');
var getAllFoods = require('./ROUTES/Foods_ROUTES/get_all_food');
var deleteAFood= require('./ROUTES/Foods_ROUTES/delete_a_food');
var selectAFood= require('./ROUTES/Foods_ROUTES/select_a_food');
var updateFood= require('./ROUTES/Foods_ROUTES/update_a_food');


/* url list of users */
app.post('/insert_user', registerUser);
app.post('/login', loginUser);
app.get('/get_all_users', getAllUsers);
app.post('/update_user', updadteAUser);
app.post('/book_a_movie', bookAMovie);
app.post('/rate_a_movie', rateAMovie);
app.post('/feedback_a_movie', feedbackAMovie);
app.post('/book_a_food', bookAFood);
app.get('/get_individual_movie_feedback/:id', getIndividualMovieFeedBack)
app.get('/get_individual_movie_rating/:id', getIndividualMovieRating)
app.get('/user_booked_movies/:uid', getUserBookedMovies);
app.delete('/cancel_a_movie_booking/:id',cancelABookedMovie)
app.get('/user_booked_foods/:uid', getUserBookedFoods);
app.delete('/cancel_a_food_booking/:id',cancelABookedFood);
app.get('/get_all_booked_movies', getAllBookedMovies);
app.get('/get_all_booked_foods', getAllBookedFoods)
app.get('/get_all_movies_feedback', getAllMovieFeedback)
app.get('/get_all_movies_rating', getAllMovieRating)

/*url list of movies */
app.post('/insert_movie', uploadMovie);
app.get('/get_all_movies', getAllMovies);
app.delete('/delete_a_movie/:id',deleteAMovie)
app.get('/get_single_movie/:id', selectAMovie)
app.post('/update_movie', updateMovie);
app.get('/get_now_showing_movies', getNowShowingMovies);
app.get('/get_up_coming_movies', getUpComingMovies);

/*url list for foods */
app.post('/insert_food', uploadFood);
app.get('/get_all_foods', getAllFoods);
app.delete('/delete_a_food/:id',deleteAFood)
app.get('/get_single_food/:id', selectAFood)
app.post('/update_food', updateFood);

// url list for booking a movie




/*user logout route */
app.post('/logout/user', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


/*check auth */
app.get('/check/auth', auth, function (req, res) {
    res.send(req.user)
})

/* UPLOAD IMAGE FOR MOVIES*/
app.use("/upload/images/movies", express.static("upload/images/movies"))

var ImagefileName = '';
var storage = multer.diskStorage({
    destination: 'upload/images/movies',
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

app.post('/upload/movie/image', upload.single('image'), function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        image: ImagefileName

    }, null, 3));
}
)

/* end of upload image for movies */



/* UPLOAD IMAGE FOR FOODS*/
app.use("/upload/images/foods", express.static("upload/images/foods"))

var ImagefileName = '';
var storage = multer.diskStorage({
    destination: 'upload/images/foods',
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

app.post('/upload/food/image', upload.single('image'), function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        image: ImagefileName

    }, null, 3));
}
)


/* UPLOAD IMAGE FOR user*/
app.use("/upload/images/users", express.static("upload/images/users"))

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