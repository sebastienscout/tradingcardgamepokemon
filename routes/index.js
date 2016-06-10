var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/* GET home page. */
router.get('/:id/:id2', function(req, res, next) {
  console.log(card1);
  var fileCard = '../data/XY/XY/42.json';
  var cardJson = new core.Builder().createFromJSON(fs.readFileSync(fileCard, 'utf8'));
  var cardPokemon = new core.Pokemon(cardJson);
  res.render('jeu', { card: cardPokemon.to_object() });
});

module.exports = router;
