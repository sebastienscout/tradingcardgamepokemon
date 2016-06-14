/**
 * Created by Alexis on 14/06/2016.
 */

var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/* GET connexion page. */
router.get('/', function(req, res, next) {
    res.render('menu');
});

module.exports = router;