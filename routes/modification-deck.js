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
      var tabEnergy=[];
      var filesGeneration = fs.readdirSync('../data/XY/Generations/');
      var filesPoingsFurieux = fs.readdirSync('../data/XY/Poings_Furieux/');
      var filesXY = fs.readdirSync('../data/XY/XY/');
      var filesImpactDesDestins = fs.readdirSync('../data/XY/Impact_Des_Destins/');
      var filesOriginesAntiques = fs.readdirSync('../data/XY/Origines_Antiques/');
      var filesEnergy = fs.readdirSync('../data/XY/energy/');


      filesEnergy.forEach(function (file) {
          if (path.extname(file) === '.json') {
              var card = new core.Builder().createEnergyFromJSON(fs.readFileSync('../data/XY/energy/' + file, 'utf8'));
              tabEnergy.push(card.to_object());
          }
      });

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

      if(req.session._id && req.session.username && req.session.mail) {
          var i;
          var tab_cartes = [];

          // Cree le document du type Deck
          var newDeck = {
              id_joueur: req.session._id
          };

          req.app.db.models.Deck.findOne({id_joueur:req.session._id},function(enn,deck){
              req.app.db.models.Carte.find({id_deck:deck._id},function(enn,cartes){
                  console.log(cartes);
                  res.render('modification-deck', {cards: tabPokemon, energies: tabEnergy, bdd: cartes});
              });
          });
          //res.render('modification-deck', { cards: tabPokemon, energies: tabEnergy });
      }


  }
});





module.exports = router;
