let express = require('express');
const session = require("express-session");
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let morgan = require('morgan');
require('dotenv').config();

let app = express();

const mainRoutes = require('./routes/mainRoutes');

app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({origin:true,credentials:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({ secret: "cats", resave: true, saveUninitialized: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://project-opa.netlify.app');
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    next();
  });
app.use('/', mainRoutes);

app.listen(process.env.PORT || 8080,()=>{console.log('backend listening')})

module.exports = app;