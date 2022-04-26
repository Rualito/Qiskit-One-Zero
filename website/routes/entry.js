var express = require('express');
var router = express.Router();

// const elastic = require("elastic.js")

// import {search_database} from "elastic.js"

/* GET home page. */
router.get('/', function(req, res, next) {
//   res.render('entry', {title: 'Testing stuff', "elastic": 1});
  res.render('entry');
});

module.exports = router;
