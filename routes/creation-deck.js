var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session._id && !req.session.username && !req.session.mail){  // Si non connecte, redirige vers connexion
    res.redirect('/connexion');
  }else { // Sinon on affiche creation-menu
    var pokemons = [];
    var energy = [];

    for (var i = 1; i < 49; i++){

      var pokemon_card = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/XY/'+i+'.json', 'utf8'));
      var pokemon = new core.Pokemon(pokemon_card);
      pokemons.push(pokemon.to_object());

    }

    res.render('creation-deck', { card: pokemons });
  }
});

module.exports = router;
