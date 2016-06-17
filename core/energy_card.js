var OpenPokemon = OpenPokemon || {};

var merge = require('merge');
var core = merge(require('./card_type'), require('./energy'));

module.exports = ( function (self) {
  "use strict";

  self.EnergyCard = function (_type, _expansion, _card_number) {
    var type;
    var expansion;
    var card_number;

    this.card_type = function () {
      return core.CardType.ENERGY;
    };

    this.type = function () {
      return type;
    };

    this.expansion = function () {
      return expansion;
    };

    this.card_number = function () {
      return card_number;
    };

    this.to_object = function () {
      return {
        type: core.EnergyType.key(type),
        expansion: expansion.to_object(),
        card_number: card_number
      }
    };

    var init = function (_type,_expansion,_card_number) {
      type = _type;
      expansion = _expansion;
      card_number = _card_number;
    };

    init(_type, _expansion, _card_number);
  };

  return self;
}(OpenPokemon || {}));