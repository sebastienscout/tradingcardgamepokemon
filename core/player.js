var OpenPokemon = OpenPokemon || {};

var merge = require('merge');
var core = merge(require('./card_type'), require('./stage'));

module.exports = ( function (self) {
  "use strict";

  self.Player = function (_deck) {
    var deck; // deck
    var active_pokemon; // pokémon actif
    var bench=[]; // banc
    var price_cards; // cartes Récompense
    var discard_pile; // pile de défausse
    var hand = []; // main

    this.hand = function () {
      var tab =[];
      var i=0;
      for(i; i < hand.length; i++) {
        tab.push(hand[i].to_object());
      }
      return tab;
    };

    this.deckLengh = function() {
      return deck.deckLengh();
    };

    this.cancelInitialHand = function () {
      hand = [];
      deck.mix();
    };

    this.getFirstBasePokemonCardIndex = function () {
      var ok = false;
      var index = 0;

      while (index < hand.length && !ok) {
        if (hand[index].card_type() === core.CardType.POKEMON && hand[index].card().stage() === core.Stage.BASE) {
            ok = true;
        } else {
          ++index;
        }
      }
      if (!ok) {
        return -1;
      } else {
        return index;
      }
    };

    this.addEnergyToPokemon = function (active, idPokemon, idEnergy) {
      if(active){
        active_pokemon.addEnergy(hand[idEnergy]);
      }
      else {
        bench[idPokemon].addEnergy(hand[idEnergy]);
      }
    };

    this.isValidInitialHand = function () {
      return this.getFirstBasePokemonCardIndex() !== -1;
    };

    this.mixDeck = function () {
      deck.mix();
    };

    this.selectInitialHand = function () {
      hand = [];
      for (var i = 0; i < 7; ++i) {
        hand.push(deck.takeFirstCard());
      }
    };

    // Retrait du pokémon
    this.withdraw = function(idPokemonBench) {
      if(active_pokemon.energies().length >= active_pokemon.card().retreat_cost()) {
        active_pokemon.removeEnergy(active_pokemon.card().retreat_cost());
        var tempPokemon = bench[idPokemonBench];
        bench.splice(idPokemonBench, 1, active_pokemon);
        active_pokemon = tempPokemon;
      }
    };

    this.takeCardInHand = function (index) {
      if (index < hand.length) {
        var card = hand[index];
        hand.splice(index, 1);
        return card;
      }
      else {
        return null;
      }
    };

    this.addBench=function(id) {
        bench.push(hand[id]);
    };

    this.bench = function(){
      var tab =[];
      var i=0;
      for(i; i < bench.length; i++) {
        tab.push(bench[i].to_object());
      }
      return tab;
    };

    this.benchToActive = function(id) {
      if (active_pokemon == null && !bench.empty) {
        active_pokemon = bench[id];
        bench.splice(id, 1);
      }
    };

    this.activePokemon = function() {
      if (active_pokemon != null) {
        return active_pokemon.to_object();
      }
      return null;
    };

    var init = function (_deck) {
      deck = _deck;
      deck.mix();
    };

    init(_deck);
  };

  return self;
}(OpenPokemon || {}));