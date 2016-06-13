/**
 * Created by Harinck Aurelien on 08/06/2016.
 */
var socket = io.connect('http://localhost:3000');
socket.emit('petit_nouveau');

socket.on('card',function(card) {
    console.log("test");
    console.log(card);
    $('.cardName').html(card.name);
    $('#cardContent img').attr("src","images/cards/pokemon/XY/"+card.expansion.name+"/"+card.card_number+".png");
    $('#evolution').html("pokemon de "+card.stage);
    $('#lifePoint').html("pv "+card.life_point);
    // TYPE
    if (card.type == 'LIGHTNING')
        $('lifePoint').append('<div class="icoLightning"></div>');
    if (card.type == 'COLORLESS')
        $('lifePoint').append('<div class="icoColorless"></div>');
    if (card.type == 'WATER')
    $('lifePoint').append('<div class="icoWater"></div>');
    if (card.type == 'PLANT')
        $('lifePoint').append('<div class="icoPlant"></div>');
    if (card.type == 'FIRE')
        $('lifePoint').append('<div class="icoFire"></div>');
    if (card.type == 'DARKNESS')
        $('lifePoint').append('<div class="icoDarkness"></div>');
    if (card.type == 'FAIRY')
        $('lifePoint').append('<div class="icoFairy"></div>');
    if (card.type == 'PSYCHIC')
        $('lifePoint').append('<div class="icoPsychic"></div>');
    if (card.type == 'METAL')
        $('lifePoint').append('<div class="icoMetal"></div>');
    if (card.type == 'FIGHTING')
        $('lifePoint').append('<div class="icoMain"></div>');

    // ATTACK
    $.each(card.attacks,function(i,attack) {
        $('#pokemonType').append('<div class="attack'+i+'"><h2></h2></div>')
        $.each(attack.energies, function(i, energy){
            $('.attack'+i+' h2').append('<div class="icoColorless"></div>');
        });
        $('.attack'+i+' h2').append(attack.title);

    });
});
$('#poke').click(function () {
    socket.emit('message', 'Salut serveur, ça va ?');
});

