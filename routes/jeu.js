var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/* GET game page. */
router.get('/', function(req, res, next) {
    if(!req.session._id && !req.session.username && !req.session.mail){  // Si non connecte, redirige vers connexion
        res.redirect('/connexion');
    }else { // Sinon on affiche jeu
        req.app.db.models.Deck.findOne({id_joueur:req.session._id},function(enn,deck){
            req.app.db.models.Carte.find({id_deck:deck._id},function(enn,cartes){
                var cards = [];
                cartes.forEach(function(carte){
                    cards.push(carte);
                });
                res.render('jeu', {cards: cards});
            });
        });
    }

});

module.exports = router;
