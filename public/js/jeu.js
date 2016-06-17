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
    lifePointsPlayer.html(pv);
});

socket.on('life-points-opponent',function(pv) {
    lifePointsOpponent.html(pv);
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
    $('#player-active').attr('src','images/cards/pokemon/XY/'+pokActive.expansion.name+'/'+pokActive.card_number+'.png');
    if(pokActive.energies != null) {
        $('#player-active').parent().children('div.energies-icones').html('');
        $.each(pokActive.energies, function (i, energy) {
            $('#player-active').parent().children('div.energies-icones').append('<div class="ico' + energy.type + '"></div>');
        });
    }
    $('#player-active').parent().css('visibility','visible');
});

socket.on('pokemonActive-opponent',function(pokActive) {
    $('#opponent-active').attr('src','images/cards/pokemon/XY/'+pokActive.expansion.name+'/'+pokActive.card_number+'.png');
    $('#opponent-active').parent().css('visibility','visible');
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

    }else if ($(this).hasClass("energy")) {
        if(pokemonActive != null) {
            $('#menu-card').append('<li><a id="showActive" href="#">Actif :</a></li>');
            $('#menu-card').append('<li><a idEnergy="' + id + '" idPokemon="active" id="energyToPokemon" href="#">&gt; ' + pokemonActive.name + '</a></li>');
        }
        if(tabBench.length > 0) {
            $('#menu-card').append('<li><a id="showBench" href="#">Banc :</a></li>');
            $.each(tabBench, function (i, card) {
                $('#menu-card').append('<li><a idEnergy="' + id + '" idPokemon="' + i + '" id="energyToPokemon" href="#">&gt; ' + card.name + '</a></li>');
            });
        }

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

$(document).on('click','#energyToPokemon',function() {
    socket.emit("energyToPokemon",$(this).attr('idpokemon'), $(this).attr('idenergy'));
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
    console.log('IdPokemon = '+$(this).children('a').attr("idPokemon"));
    $('#zoomed-card').hide();
});