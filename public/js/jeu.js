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
        handPlayer.append('<li><img src="images/cards/pokemon/XY/'+card.expansion.name+'/'+card.card_number+'.png" class="interaction hand" id="'+i+'"/></li>');
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
        benchPlayer.append('<li><img src="images/cards/pokemon/XY/'+card.expansion.name+'/'+card.card_number+'.png" class="interaction bench hvr-grow" id="'+i+'"/></li>');
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

$(document).on('click','.interaction',function(event){
    event.stopPropagation();
    var id = $(this).attr('id');
    var src = $(this).attr('src');
    $('#zoomed-card img').attr('src', src);
    $('#zoomed-card').show();

    $('#menu-card').html('');
    if ($(this).hasClass("hand")) {
        $('#menu-card').append('<li><a idPokemon="'+id+'" id="toBench" href="#">Banc</a></li>');

    }else if ($(this).hasClass("bench")){
        $('#menu-card').append('<li><a idPokemon="'+id+'" id="toActive" href="#">Passer actif</a></li>');
            
    }else if ($(this).attr("id") == 'player-active' ) {
        $.each(pokemonActive.attacks, function(i, attack) {
            $('#menu-card').append('<li><a idAttack="' + i + '" id="attackActive" href="#">"' + attack.title + '"</a></li>');
        });
        $('#menu-card').append('<li><a id="withdraw" href="#">Retrait</a></li>');
        $.each(tabBench, function(i, card){
            $('#menu-card').append('<li class="withdraw" ><a idPokemon="'+i+'" href="#">&gt; Echanger avec '+card.name+'</a></li>');
        });
    }
    $('#menu-card').append('<li><a href="#" id="cancel">Annuler</a></li>');
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

$(document).on('click','#cancel',function() {
    $('#zoomed-card').hide();
});

$('.withdraw').hide();
$(document).on('click','#withdraw',function() {
    $('.withdraw').show();
});

$(document).on('click','.withdraw',function() {
    socket.emit("withdraw", $(this).children('a').attr("idPokemon"));
    $('#zoomed-card').hide();
});