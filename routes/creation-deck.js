var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session._id && !req.session.username && !req.session.mail){ // Si non connecte, redirige vers connexion
    res.redirect('/connexion');
  }else{

      var tabPokemon=[];
      var filesGeneration = fs.readdirSync('../data/XY/Generations/');
      var filesPoingsFurieux = fs.readdirSync('../data/XY/Poings_Furieux/');
      var filesXY = fs.readdirSync('../data/XY/XY/');
      var filesImpactDesDestins = fs.readdirSync('../data/XY/Impact_Des_Destins/');
      var filesOriginesAntiques = fs.readdirSync('../data/XY/Origines_Antiques/');

      filesGeneration.forEach(function (file) {
          if (path.extname(file) === '.json') {
              var card = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/Generations/' + file, 'utf8'));
              tabPokemon.push(card.to_object());
          }
      });

      filesPoingsFurieux.forEach(function (file) {
          if (path.extname(file) === '.json') {
              var card = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/Poings_Furieux/' + file, 'utf8'));
              tabPokemon.push(card.to_object());
          }
      });


      filesXY.forEach(function (file) {
          if (path.extname(file) === '.json') {
              var card = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/XY/' + file, 'utf8'));
              tabPokemon.push(card.to_object());
          }
      });

      filesImpactDesDestins.forEach(function (file) {
          if (path.extname(file) === '.json') {
              var card = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/Impact_Des_Destins/' + file, 'utf8'));
              tabPokemon.push(card.to_object());
          }
      });


      filesOriginesAntiques.forEach(function (file) {
          if (path.extname(file) === '.json') {
              var card = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/Origines_Antiques/' + file, 'utf8'));
              tabPokemon.push(card.to_object());
          }
      });





    res.render('creation-deck', { cards: tabPokemon  });

  }
});



router.put('', function(req, res) {
    if(req.session._id && req.session.username && req.session.mail) {
        var i;
        var tab_cartes = [];

        // Cree le document du type Deck
        var newDeck = {
            id_joueur: req.session._id
        };

        // Insert le deck et recupere l'id du Deck insere
        req.app.db.models.Deck.create(newDeck, function (err, deck) {
            // Cree le tableau de documents de type carte
            for (i = 0; i < 60; i++) {
                tab_cartes[i] = {
                    num_carte: req.body["tab[" + i + "][num_carte]"],
                    id_deck: deck._id,
                    id_generation: req.body["tab[" + i + "][id_generation]"]

                };
            }
            // Insertion des cartes
            req.app.db.models.Carte.insertMany(tab_cartes);

        });
    }
});








module.exports = router;
