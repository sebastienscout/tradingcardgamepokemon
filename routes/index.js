var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');
var path = require('path');
/* GET home page. */


var pokemon_cards=[];
router.get('/', function(req, res, next) {
 // var fileCard = '../data/XY/XY/42.json';

  var files = fs.readdirSync('../data/XY/Generations/');
  files.forEach(function (file) {
    if (path.extname(file) === '.json') {
      pokemon_cards.push(new core.Builder().createFromJSON(fs.readFileSync('../data/XY/Generations/' + file, 'utf8')));
    }

  });
  console.log(pokemon_cards[0].name);
  res.render('index', {  });
  //card: pokemon_cards[0].to_object()
 // var cardJson = new core.Builder().createFromJSON(fs.readFileSync(fileCard, 'utf8'));
  //var cardPokemon = new core.Pokemon(cardJson);

});

module.exports = router;
