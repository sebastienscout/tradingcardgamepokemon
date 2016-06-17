var OpenPokemon = OpenPokemon || {};

var merge = require('merge');
var core = merge(require('./card_type'), require('./stage'));

module.exports = ( function (self) {
  "use strict";

  self.Player = function (_deck) {
    var deck; // deck
    var active_pokemon; // pokémon actif
    var bench=[]; // banc
    var price_cards=[]; // cartes Récompense
    var discard_pile; // pile de défausse
    var hand; // main

    this.hand = function () {
      if (!hand.empty) {
        var tab = [];
        var i = 0;
        for (i; i < hand.length; i++) {
          tab.push(hand[i].to_object());
        }
        return tab;
      }
    };

    this.initPriceCard = function(card) {
      for (var i =0 ; i < 6 ; i++) {
        price_cards[i]=deck.takeFirstCard();
      }
    };
    this.priceCardLength = function() {
      return price_cards.length;
    };
    this.addPriceToHand = function(id) {
      console.log(price_cards[id]);
      hand.push(price_cards[id]);
      price_cards.splice(id, 1);
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
        if (hand[index].card_type() === core.CardType.POKEMON && hand[index].stage() === core.Stage.BASE) {
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
      var tempPokemon = bench[idPokemonBench];
      bench.splice(idPokemonBench, 1, active_pokemon);
      active_pokemon = tempPokemon;
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
    this.activePokemonNotObject = function() {
      return active_pokemon;
    }
    this.activePokemonToDefausse = function() {
      active_pokemon = null;
    }
    var init = function (_deck) {
      deck = _deck;
      deck.mix();
    };

    init(_deck);
  };

  return self;
}(OpenPokemon || {}));