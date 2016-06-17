var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.Coin = {
    HEADS: 0,
    TAILS: 1
  };

  self.Board = function (_players) {
    var players;
    var attacker_index;
    var defender_index;

    this.attacker = function () {
      return players[attacker_index];
    };

    this.defender = function () {
      return players[defender_index];
    };

    this.cancelInitialHands = function () {
      players.forEach(function (player) {
        player.cancelInitialHand();
      });
    };
    this.initPriceCard = function() {
      players[0].initPriceCard();
      players[1].initPriceCard();
    }
    this.flipCoin = function () {
      return (Math.random() <= 0.5) ? self.Coin.HEADS : self.Coin.TAILS;
    };

    this.selectInitialHands = function () {
      players.forEach(function (player) {
        player.selectInitialHand();
        while(!player.isValidInitialHand()){
          player.cancelInitialHands();
          player.selectInitialHands();
        }
      });
    };

    this.turn = function () {
      players[attacker_index].attacks()[0].action().run(this);
      changeAttackerDefenser();
    };

    var changeAttackerDefenser = function () {
      var index = attacker_index;

      attacker_index = defender_index;
      defender_index = index;
    };

    var init = function (_players) {
      players = _players;
      attacker_index = 0;
      defender_index = 1;
    };

    init(_players);
  };

  return self;
}(OpenPokemon || {}));