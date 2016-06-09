var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/* GET game page. */
router.get('/', function(req, res, next) {
    res.render('jeu');
});

module.exports = router;
