/**
 * Created by Alexis on 14/06/2016.
 */

$( document ).ready(function() {

    //Bouton Créer Deck
    $("#createDeck").click(function () {
        window.location.replace("/creation-deck");
    });

    //Boutton Modifier Deck
    $("#editDeck").click(function () {
        window.location.replace("/modification-deck");
    });

    //Boutton Lancer Partie
    $("#playGame").click(function () {
        window.location.replace("/jeu");
    });

    $("#logOut").click(function () {
        console.log("test");
        window.location.replace("/connexion?deconnexion=true");
    });



});

