var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session._id && !req.session.username && !req.session.mail){ // Si non connecte, redirige vers connexion
    res.redirect('/connexion');
  }else{

    var pokemonsXY = [];
    var pokemonsGenerations = [];
    var pokemonsPoingsFurieux = [];
    var energy = [];

    for (var i = 1; i < 49; i++){
      var file = '../data/XY/XY/' + i + '.json';
      var pokemon_cardXY = new core.Builder().createFromJSON(fs.readFileSync(file, 'utf8'));
      var pokemonXY = new core.Pokemon(pokemon_cardXY);
      pokemonsXY.push(pokemonXY.to_object());

    }

    for (var i = 1; i < 58; i++) {

       try {
        var file = '../data/XY/Generations/' + i + '.json';
        fs.accessSync(file, fs.F_OK);

        var pokemon_cardGenerations = new core.Builder().createFromJSON(fs.readFileSync(file, 'utf8'));
        var pokemonGenerations = new core.Pokemon(pokemon_cardGenerations);
        pokemonsGenerations.push(pokemonGenerations.to_object());

       }
       catch(e) {
        console.log("test");
       }

    }

    for (var i = 1; i < 59; i++) {

      try {
        var file = '../data/XY/Poings_Furieux/' + i + '.json';
        fs.accessSync(file, fs.F_OK);

        var pokemon_cardPoingsFurieux = new core.Builder().createFromJSON(fs.readFileSync(file, 'utf8'));
        var pokemonPoingsFurieux = new core.Pokemon(pokemon_cardPoingsFurieux);
        pokemonsPoingsFurieux.push(pokemonPoingsFurieux.to_object());

      }
      catch(e) {
        console.log("test");
      }

    }


    res.render('creation-deck', { card: pokemonsXY, card2: pokemonsGenerations, card3: pokemonsPoingsFurieux  });

  }
});
module.exports = router;
