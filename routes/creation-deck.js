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




    res.render('creation-deck', { cards: tabPokemon  });

  }
});
module.exports = router;
