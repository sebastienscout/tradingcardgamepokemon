/**
 * Created by Alexis on 14/06/2016.
 */

$( document ).ready(function() {

    //Bouton Créer Deck
    $("#createDeck").click(function () {
        $('#sonMenu')[0].play(); //Son au clic sur menu
        window.location.replace("/creation-deck");
    });

    //Boutton Modifier Deck
    $("#editDeck").click(function () {
        $('#sonMenu')[0].play(); //Son au clic sur menu
        window.location.replace("/modification-deck");
    });

    //Boutton Lancer Partie
    $("#playGame").click(function () {
        $('#sonMenu')[0].play(); //Son au clic sur menu
        window.location.replace("/jeu");
    });

    $("#logOut").click(function () {
        $('#sonMenu')[0].play(); //Son au clic sur menu
        //window.location.replace("/connexion?deconnexion=true");

        $.ajax({
            type: 'PUT',
            url: '/connexion',
            data: {
                type: "logOut"
            },
            sucess: function (sucess) {
                alert('sucess');
            },
            err: function (err) {
                alert('err');
            }
        });
        window.location.replace("/connexion");

    });



});

