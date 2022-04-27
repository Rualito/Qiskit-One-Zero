// DEPRECATED : don't use this file

var express = require('express');
var router = express.Router();

// const elastic = require("elastic.js")

// import {search_database} from "elastic.js"

/* GET home page. */
router.get('/', function(req, res, next) {
  // choose entry point (debug)
  res.locals.user_code = Math.floor(Math.random() * 10000) // randomly generate code

  //res.sendFile('entry.html', {root: './views'})
  //res.sendFile('alice.html', {root: './views'})
  res.sendFile('bob.html', {root: './views'})

});

module.exports = router;
