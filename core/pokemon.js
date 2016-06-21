var OpenPokemon = OpenPokemon || {};

module.exports = ( function (self) {
  "use strict";

  self.Pokemon = function (_card) {
    var card;
    var life_point;
    var states;
    var energies = [];

    this.addEnergy = function(energy) {
      energies.push(energy);
    };

    this.removeEnergy = function(index) {
      energies.splice(0, index);
    };

    this.energies = function(){
      return energies;
    };

    this.attacks = function () {
      return card.attacks();
    };
    this.testEnergieAttack= function(tabEnergieAttack) {
        var test;
        var energiesPokemon=[];
        energies.forEach(function(energie) {
            energiesPokemon.push(energie);
        });
        var nbIncolore=0;
        if (tabEnergieAttack.length >= energies.length) {
        tabEnergieAttack.forEach(function(energieAttack,index) {
            test = false;
            energiesPokemon.forEach(function(energiePokemon) {
              if (energieAttack == "COLORLESS") {
                nbIncolore++;
                test = true;
              }else if (energieAttack == energiePokemon.to_object().type) {
                test = true;
              }
              energiesPokemon.splice(index,1);
            });
            if (!test) {
              return false;
            }
        });
    }
      if (nbIncolore > energies.length) {
        return false;
      }
      return true;
    }

    this.attack = function(idAttack) {
      return attacks()[idAttack].value.value;
    }
    this.applyDamage = function (points) {
      life_point -= points;
    };

    this.life_point = function () {
      return life_point;
    };

    this.name = function () {
      return card.name();
    };
    function extend(target) {
      var sources = [].slice.call(arguments, 1);
      sources.forEach(function (source) {
        for (var prop in source) {
          target[prop] = source[prop];
        }
      });
      return target;
    }
    this.to_object = function () {
      var energiesJson = {
        energies : energies.map(function (energy) { return energy.to_object(); })
      };
      var remainingHP = { remaining_life_points : life_point};
      return extend({},card.to_object(),energiesJson,remainingHP);
    };

    this.card_type = function() {
      return card.card_type();
    };

    this.card = function () {
      return card;
    };

    var init = function (_card) {
      card = _card;
      life_point = card.life_point();
      states = [];
    };

    init(_card);
  };

  return self;
}(OpenPokemon || {}));