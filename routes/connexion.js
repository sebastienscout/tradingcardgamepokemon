/**
 * Created by Alexis on 08/06/2016.
 */

var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/* GET connexion page. */
router.get('/', function(req, res, next) {

    console.log("Bienvenue dans l'espace de connexion");
    res.render('connexion');
});

module.exports = router;
