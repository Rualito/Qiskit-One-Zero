var express = require('express');
var router = express.Router();

// const elastic = require("elastic.js")

// import {search_database} from "elastic.js"

/* GET home page. */
router.get('/', function(req, res, next) {
  // choose entry point (debug)

  //res.sendFile('entry.html', {root: './views'})
  //res.sendFile('alice.html', {root: './views'})
  res.sendFile('bob.html', {root: './views'})

  });

module.exports = router;
