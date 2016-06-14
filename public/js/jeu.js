/**
 * Created by sebastien on 09/06/2016.
 */
var socket = io.connect('http://localhost:3000');

var boardPlayer = $('#board-player');
var handPlayer = boardPlayer.children('div.cards').children('div.cards-hand').children('ul');
var benchPlayer = boardPlayer.children('div.cards').children('div.cards-bench').children('ul');
var tabBench;
var main;
var pokemonActive;

socket.on('hand',function(hand) {
    handPlayer.html('');
    $.each(hand, function(i, card){
        handPlayer.append('<li><img src="images/cards/pokemon/XY/'+card.expansion.name+'/'+card.card_number+'.png" class="interaction hand" id="'+i+'"/></li>');
    });
    main=hand;
});
socket.on('bench',function(bench) {
    benchPlayer.html('');
    $.each(bench, function(i, card){
        benchPlayer.append('<li><img src="images/cards/pokemon/XY/'+card.expansion.name+'/'+card.card_number+'.png" class="interaction bench" id="'+i+'"/></li>');
    });
    tabBench=bench;
});
socket.on('pokemonActive',function(pokActive) {
   pokemonActive = pokActive;
   $('#player-active').attr('src','images/cards/pokemon/XY/'+pokActive.expansion.name+'/'+pokActive.card_number+'.png');
    $('#player-active').css('visibility','visible');
});
socket.on('nbCarteDeck',function(nbCarteDeck) {
    boardPlayer.children('div.numbered-cards').children('div.deck').children('div.number-cards').html(nbCarteDeck);
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
            console.log(attack);
            $('#menu-card').append('<li><a idAttack="' + i + '" id="attackActive" href="#">"' + attack.title + '"</a></li>');
        });
    }
    $('#menu-card').append('<li><a href="#">Annuler</a></li>');

});
$(document).on('click','#toActive',function() {
    socket.emit("toActive",$(this).attr('idPokemon'));
});

$(document).on('click','#toBench',function() {
    socket.emit("toBench",$(this).attr('idPokemon'));
});

$(document).on('click','body',function() {
    $('#zoomed-card').hide();
});