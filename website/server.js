var express = require('express');
var router  = express.Router();
var path = require('path');
// const cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

var entryRouter = require("./routes/entry")

var aliceRouter = require("./routes/alice")
var bobRouter = require("./routes/bob");

app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser())


app.use('/', entryRouter)

// app.use(function(req, res, next) {
//     next(createError(404));
// });

module.exports = app;
