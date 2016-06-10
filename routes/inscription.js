/**
 * Created by Alexis on 08/06/2016.
 */

var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/* GET inscription page. */
router.get('/', function(req, res, next) {
    res.render('inscription');
});

module.exports = router;
