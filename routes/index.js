var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var fileCard = './data/XY/XY/42.json';
  var cardJson = new core.Builder().createFromJSON(fs.readFileSync(fileCard, 'utf8'));
  var cardPokemon = new core.Pokemon(cardJson);
  console.log(cardPokemon.to_object());
  res.render('index', { card: cardPokemon.to_object() });
});

module.exports = router;
