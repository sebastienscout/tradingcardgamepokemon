var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

router.post('/', function(req, res, next) {
    res.render('menu');
});

router.get('/', function(req, res, next) {
    if(!req.session._id && !req.session.username && !req.session.mail){  // Si non connecte, redirige vers connexion
        res.redirect('/connexion');
    }else { // Sinon on affiche menu
        var has_deck = 0;
        req.app.db.models.Deck.count({'id_joueur':req.session._id}, function(err, deck){
            if(deck > 0){
                has_deck = 1;
            }else{

            }

            res.render('menu', {
                _id: req.session._id,
                username: req.session.username,
                mail: req.session.mail,
                deck: has_deck
            });
        });
    }
});



module.exports = router;

