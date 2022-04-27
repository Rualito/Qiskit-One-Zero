var express = require('express');
var router  = express.Router();
var path = require('path');
// const cookieParser = require('cookie-parser');
var logger = require('morgan');

let package = require("./package.json");

var app = express();
// Creating Http Server from Express App to work with socket.io
const http = require('http').Server(app);

const io = require('socket.io')(http,{
    // Specifying CORS 
    cors: {
    origin: "*",
    }
})


var entryRouter = require("./routes/backend")

// var aliceRouter = require("./routes/alice")
// var bobRouter = require("./routes/bob");

app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser())


app.use('/', entryRouter)
// app.use('/alice', aliceRouter)
// app.use('/bob', bobRouter)

// app.use(function(req, res, next) {
//     next(createError(404));
// });

module.exports = app;
