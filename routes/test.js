
var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

router.get('/', function(req, res, next) {
    /*
     var id_deck;

    //Initialisation des Generations
    var newGenerationGenerations = {
        num_generation: 83,
        nom_generation: 'Generations'
    };

    var newGenerationXY = {
        num_generation: 146,
        nom_generation: 'XY'
    };

    var newGenerationPoings_Furieux = {
        num_generation: 111,
        nom_generation: 'Poings_Furieux'
    };

    var newGenerationOrigines_Antiques = {
        num_generation: 98,
        nom_generation: 'Origines_Antiques'
    };

    var newGenerationImpact_Des_Destins = {
        num_generation: 124,
        nom_generation: 'Impact_Des_Destins'
    };

    var newGenerationEnergies = {
        num_generation: 9,
        nom_generation: 'Energies'
    };

    req.app.db.models.Generation.create(
        [
            newGenerationGenerations,
            newGenerationXY,
            newGenerationOrigines_Antiques,
            newGenerationImpact_Des_Destins,
            newGenerationEnergies
        ], function(err, deck) {

        }
    );
    */

    /*
    //Creation Deck
    var newDeck = {
        id_joueur: '575ff912d2cd67201b5b0e8c'
    };


    req.app.db.models.Deck.create(newDeck, function(err, deck) {
        if (err){
            console.log('Error in Saving user: '+err);
            throw err;
        }
        console.log('Deck Registration succesful');
        id_deck = deck._id;
    });
    */

    //Ajout des Cartes dans le Deck


    /*
    req.app.db.models.Carte.insertMany(
        [



        ]
    );
*/



    console.log("GET");
    res.render('test');
});

router.post('/', function(req, res, next) {
    console.log("POST");
    res.render('test');
});

module.exports = router;
