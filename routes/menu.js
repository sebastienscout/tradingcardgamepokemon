/**
 * Created by Alexis on 08/06/2016.
 */

var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

router.post('/', function(req, res, next) {
    res.render('menu');
});

router.get('/', function(req, res, next) {
    res.render('menu', {
        _id: req.session._id,
        username: req.session.username,
        mail: req.session.mail
    });
});


module.exports = router;

