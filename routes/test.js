
var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

router.get('/', function(req, res, next) {
    console.log("dsrghtryjtugfds");

    var tab = [];

    //Initialisation des Generations
    tab[0] = {
        num_generation: 83,
        nom_generation: 'Generations'
    };

    tab[1] = {
        num_generation: 146,
        nom_generation: 'XY'
    };

    tab[2] = {
        num_generation: 111,
        nom_generation: 'Poings Furieux'
    };

    tab[3] = {
        num_generation: 98,
        nom_generation: 'Origines Antiques'
    };

    tab[4] = {
        num_generation: 124,
        nom_generation: 'Impact Des Destins'
    };

    tab[5] = {
        num_generation: 9,
        nom_generation: 'energy'
    };
    console.log("dsrghtryjtugfds");
    console.log(tab);
    req.app.db.models.Generation.insertMany(tab);


    res.render('test');
});

router.post('/', function(req, res, next) {
    console.log("POST");
    res.render('test');
});

module.exports = router;
