
var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');


module.exports = router;

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

