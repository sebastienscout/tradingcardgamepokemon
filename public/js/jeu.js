/**
 * Created by sebastien on 09/06/2016.
 */
var socket = io.connect('http://localhost:3000');

var boardPlayer = $('#board-player');
var boardOpponent = $('#board-opponent');
var handPlayer = boardPlayer.children('div.cards').children('div.cards-hand').children('ul');
var handOpponent = boardOpponent.children('div.cards').children('div.cards-hand').children('ul');
var benchPlayer = boardPlayer.children('div.cards').children('div.cards-bench').children('ul');
var benchOpponent = boardOpponent.children('div.cards').children('div.cards-bench').children('ul');
var lifePointsPlayer = boardPlayer.children('div.cards').children('div.cards-active').children('div.life-points');
var lifePointsOpponent = boardOpponent.children('div.cards').children('div.cards-active').children('div.life-points');
var tabBench;
var main;
var pokemonActive;
var turnPlayer;

var deck = [];

$('#recup-card div').each(function() {
    var card = {
        expansion : $(this).attr('expansion'),
        card_number : $(this).attr("num")
    }
    deck.push(card);
});

socket.emit("start-game", deck);

socket.on('life-points',function(pv) {
    if (pv != 0) {
        lifePointsPlayer.html(pv);
        lifePointsPlayer.css('visibility','visible');
    }else {
        lifePointsPlayer.css('visibility','hidden');
    }
});

socket.on('life-points-opponent',function(pv) {
    if (pv != 0) {
        lifePointsOpponent.html(pv);
        lifePointsOpponent.css('visibility','visible');
    }else {
        lifePointsOpponent.css('visibility','hidden');
    }
});

socket.on('hand',function(hand) {
    handPlayer.html('');
    $.each(hand, function(i, card){
        if(card.expansion.name == "energy") {
            handPlayer.append('<li><img src="images/cards/' + card.expansion.name + '/' + card.card_number + '.png" class="interaction energy" id="' + i + '"/></li>');
        }
        else {
            handPlayer.append('<li><img src="images/cards/pokemon/XY/' + card.expansion.name + '/' + card.card_number + '.png" class="interaction hand" id="' + i + '"/></li>');
        }
    });
    main=hand;
});

socket.on('hand-opponent',function(nbHand) {
    handOpponent.html('');
    for(var i=0 ; i < nbHand; i++) {
        handOpponent.append('<li><img src="images/board/back.png"/></li>');
    }
});

socket.on('bench',function(bench) {
    benchPlayer.html('');

    $.each(bench, function(i, card){
        var temp = '<div class="energies-icones">';

        $.each(card.energies, function (i, energy) {
            temp+='<div class="ico' + energy.type + '"></div>';
        });

        temp+='</div>';
        benchPlayer.append('<li><img src="images/cards/pokemon/XY/'+card.expansion.name+'/'+card.card_number+'.png" class="interaction bench hvr-grow" id="'+i+'"/>'+temp+'</li>');

        $('#bench').parent().children('div.energies-icones').html('');
    });
    tabBench=bench;
});

socket.on('bench-opponent',function(nbBench) {
    benchOpponent.html('');
    for(var i=0 ; i < nbBench; i++) {
        benchOpponent.append('<li><img src="images/board/back.png"/></li>');
    }
});

socket.on('pokemonActive',function(pokActive) {
    pokemonActive = pokActive;

    if (pokemonActive != null) {
        $('#player-active').attr('src', 'images/cards/pokemon/XY/' + pokActive.expansion.name + '/' + pokActive.card_number + '.png');
        if(pokActive.energies != null) {
            $('#player-active').parent().children('div.energies-icones').html('');
            $.each(pokActive.energies, function (i, energy) {
                $('#player-active').parent().children('div.energies-icones').append('<div class="ico' + energy.type + '"></div>');
            });
        }
        $('#player-active').parent().css('visibility', 'visible');
    }else {
        $('#player-active').parent().css('visibility', 'hidden');
    }

});

socket.on('pokemonActive-opponent',function(pokActive) {
    if (pokActive != null) {
        $('#opponent-active').attr('src', 'images/cards/pokemon/XY/' + pokActive.expansion.name + '/' + pokActive.card_number + '.png');
        $('#opponent-active').parent().css('visibility', 'visible');
    }else {
        $('#opponent-active').parent().css('visibility', 'hidden');
    }
});

socket.on("turn", function(turn){
    turnPlayer = turn;
    if(turn){
        $('#end-turn').css('background', '#275794');
        $('#end-turn').css('cursor', 'pointer');
        $('#end-turn').attr('disabled', false);
        $('#end-turn').html("Fin de tour");
    }
    else {
        $('#end-turn').css('background', 'grey');
        $('#end-turn').css('cursor', 'wait');
        $('#end-turn').attr('disabled', 'disabled');
        $('#end-turn').html("Tour adverse...");
    }
});

socket.on("nbCardPrice", function(nbCartePrice) {
    boardPlayer.children('div.numbered-cards').children('div.rewards').children('div.number-cards').html(nbCartePrice);
});

socket.on("nbCardPrice-opponent", function(nbCartePrice) {
    boardOpponent.children('div.numbered-cards').children('div.rewards').children('div.number-cards').html(nbCartePrice);
});

socket.on('nbCardDeck',function(nbCarteDeck) {
    boardPlayer.children('div.numbered-cards').children('div.deck').children('div.number-cards').html(nbCarteDeck);
});

socket.on('nbCardDeck-opponent',function(nbCarteDeck) {
    boardOpponent.children('div.numbered-cards').children('div.deck').children('div.number-cards').html(nbCarteDeck);
});
socket.on('victory',function() {
   $('body').append('<div id="result">Victoire !<a href="/menu">Retour au menu</a></div>');
});
socket.on('defeat',function() {
    $('body').append('<div id="result">Defaite !<a href="/menu">Retour au menu</a></div>');
});
$(document).on('click','#toActive',function() {
    socket.emit("toActive",$(this).attr('idPokemon'));
    $('#zoomed-card').hide();
});

$(document).on('click','#toBench',function() {
    socket.emit("toBench",$(this).attr('idPokemon'));
    $('#zoomed-card').hide();
});

$(document).on('click','#attackActive',function() {
    socket.emit("attack",$(this).attr("idAttack"));
    $('#zoomed-card').hide();
});

$(document).on('click','#energyToPokemon',function() {
    socket.emit("energyToPokemon",$(this).attr('idpokemon'), $(this).attr('idenergy'));
    $('#zoomed-card').hide();
});

$(document).on('click','#cancel',function() {
    $('#zoomed-card').hide();
});

$(document).on('click','#withdraw',function() {
    if($('.withdraw').is(':visible')){
        $('.withdraw').slideUp(250);
    }
    else {
        $('.withdraw').slideDown(250);
    }
});

$(document).on('click','#attacks',function() {
    if($('.attack').is(':visible')){
        $('.attack').slideUp(250);
    }
    else {
        $('.attack').slideDown(250);
    }
});

$(document).on('click','#showActive',function() {
    if($('.show-active').is(':visible')){
        $('.show-active').slideUp(250);
    }
    else {
        $('.show-active').slideDown(250);
    }
});

$(document).on('click','#showBench',function() {
    if($('.show-bench').is(':visible')){
        $('.show-bench').slideUp(250);
    }
    else {
        $('.show-bench').slideDown(250);
    }
});

$(document).on('click','.withdraw',function() {
    socket.emit("withdraw", $(this).children('a').attr("idPokemon"));
    $('#zoomed-card').hide();
});

$(document).on('click','#end-turn',function() {
    if(pokemonActive != null){
        socket.emit("endTurn");
    }
    else{
        alert("Vous devez avoir un pokémon actif !");
    }
});

$(document).on('click','.interaction',function(event){
    event.stopPropagation();
    var id = $(this).attr('id');
    var src = $(this).attr('src');
    $('#zoomed-card img').attr('src', src);
    $('#zoomed-card').show();

    $('#menu-card').html('');

    if(turnPlayer) {
        if ($(this).hasClass("hand")) {
            $('#menu-card').append('<li><a idPokemon="' + id + '" id="toBench" href="#">Placer sur le banc</a></li>');

        } else if ($(this).hasClass("energy")) {
            if (pokemonActive != null) {
                $('#menu-card').append('<li><a id="showActive" href="#"><b>&or; Actif</b></a></li>');
                $('#menu-card').append('<li class="show-active"><a idEnergy="' + id + '" idPokemon="active" id="energyToPokemon" href="#">' + pokemonActive.name + '</a></li>');
            }
            if (tabBench.length > 0) {
                $('#menu-card').append('<li><a id="showBench" href="#"><b>&or; Banc</b></a></li>');
                $.each(tabBench, function (i, card) {
                    $('#menu-card').append('<li class="show-bench"><a idEnergy="' + id + '" idPokemon="' + i + '" id="energyToPokemon" href="#">' + card.name + '</a></li>');
                });
            }

        } else if ($(this).hasClass("bench")) {
            if (pokemonActive == null) {
                $('#menu-card').append('<li><a idPokemon="' + id + '" id="toActive" href="#">Placer en actif</a></li>');
            }

        } else if ($(this).attr("id") == 'player-active') {
            $('#menu-card').append('<li><a id="attacks" href="#"><b>&or; Attaques</b></a></li>');
            $.each(pokemonActive.attacks, function (i, attack) {
                $('#menu-card').append('<li class="attack"><a idAttack="' + i + '" id="attackActive" href="#">' + attack.title + '</a></li>');
            });

            if (tabBench.length > 0) {
                $('#menu-card').append('<li><a id="withdraw" href="#"><b>&or; Retrait</b></a></li>');
                $.each(tabBench, function (i, card) {
                    $('#menu-card').append('<li class="withdraw" ><a idPokemon="' + i + '" href="#">Envoyer ' + card.name + '</a></li>');
                });
            }
        }
    }
    $('#menu-card').append('<li><a href="#" id="cancel">Annuler</a></li>');
});
