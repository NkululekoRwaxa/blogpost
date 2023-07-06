
const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

// controllers
const homeController = require('./controllers/home');
const newPostController = require('./controllers/newPost');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const validateMiddleWare = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const LogoutController = require('./controllers/logout');
const flash = require('connect-flash');

/**
 * tell Express to use EJS as templating engine
 * register 'public' folder for static files
 */
app.set('view engine', 'ejs');
app.use(express.static('public'));

/**
 * middle ware functions
 */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload());
app.use('/posts/store', validateMiddleWare);
app.use(expressSession({
    secret: 'keyboard cat',
    resave:true,
    saveUninitialized: true
}));
app.use(morgan("combined"));

/** 
 * hide login & register pages to users that are logged in 
 * global variable accessible to all .ejs files on all requests ('*')
 * */
global.loggedIn = null;
app.use('*', (req,res, next)=>{
    loggedIn = req.session.userId;
    next();
});
app.use(flash());

/**
 * talk to MongoDB from Node using Mongoose library 
 */
mongoose.connect('mongodb+srv://codecollege_31:codecollege_31@cluster0.mesy7wf.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true});


/**
 * routes
 */
app.get('/', homeController);
app.get('/post/:id', getPostController);
app.post('/posts/store',authMiddleware, storePostController);
app.get('/posts/new',authMiddleware, newPostController);
app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', LogoutController);
app.use((req,res)=> res.render('notfound'));

/**
 * run app
 */
let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
};

app.listen(port, ()=>{
    console.log('App listing no port:', port)
});
