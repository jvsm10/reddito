const path = require('path');
 
const express = require('express');

const expressEdge = require('express-edge');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const fileUpload = require("express-fileupload");

const expressSession = require('express-session');

const connectMongo = require('connect-mongo');

const connectFlash = require("connect-flash");

const edge = require('edge.js');

const replaceString = require('replace-string');

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const logoutController = require("./controllers/logout");
const mypostController = require("./controllers/myposts");
const getPostTypeController = require("./controllers/getPostByType");
const deletePostController = require("./controllers/deletePost");
const getPostUserController = require("./controllers/postsUser");
const storePost = require('./middleware/storePost');
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');

const app = new express();

mongoose.connect('mongodb://localhost:27017/reddito', { useNewUrlParser: true })
    .then(() => 'Você está conectado com o banco')
    .catch(err => console.error('Algo de errado não está certo', err));

mongoose.set('useCreateIndex', true);

const mongoStore = connectMongo(expressSession);
 
app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(connectFlash());
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
app.use(expressEdge);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
});

app.use('/posts/store', storePost);
app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", auth, storePost, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", auth, logoutController);
app.get("/auth/mypost", auth, mypostController);
app.get("/posts/:type", getPostTypeController);
app.get("/postUser/:usId", getPostUserController);
app.post("/posts/:id", auth, deletePostController);


 
app.listen(4000, () => {
    console.log('Escustando na porta 4000')
});

