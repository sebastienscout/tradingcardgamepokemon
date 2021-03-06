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
            if(deck < 1){ // Si il a pas de Deck
                res.render('menu', {
                    _id: req.session._id,
                    username: req.session.username,
                    mail: req.session.mail,
                    deck: has_deck
                });
            }else{ // Si a un Deck
                has_deck = 1;
                var cartes_deck = [];


                req.app.db.models.Deck.findOne({'id_joueur':req.session._id}, function(err, deck) {
                    req.app.db.models.Carte.aggregate(
                    [
                        {
                            $project: {
                                num_carte: 1,
                                id_generation: 1,
                                id_deck: 1
                            }
                        },
                        {
                            "$group": {
                                "_id": {
                                    'num_c': '$num_carte',
                                    'num_g': '$id_generation',
                                    'num_d': '$id_deck'
                                }, "total_cartes": {
                                    "$sum": 1
                                }
                            }

                        }
                    ],
                    function (err, carte) {
                        if (err) return handleError(err);


                        var parcour_tableau_carte;
                        for(parcour_tableau_carte = 0; parcour_tableau_carte < carte.length; parcour_tableau_carte++){

                            if(deck._id == carte[parcour_tableau_carte]._id.num_d) {
                                cartes_deck[cartes_deck.length] = carte[parcour_tableau_carte];
                            }
                        }



                        res.render('menu', {
                            _id: req.session._id,
                            username: req.session.username,
                            mail: req.session.mail,
                            deck: has_deck,
                            tab_deck: cartes_deck
                        });
                    });
                });
            }
        });
    }
});



module.exports = router;

