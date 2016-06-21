/**
 * Created by mhabinka on 09/06/16.
 */


$(document).ready(function() {

    var total = 0;
    var pokemons = 0;
    var energies = 0;
    var trainer = 0;
    var verif = $("#donnees");
    var bool_energies = true;
    var bool_trainer = true;
    var bool_total = true
    var ok = false;
    var envoi = new Array();
    var indice = 0;
    var nbCarteValide = 60;

    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    $("#random").click(function () {
        if(energies<18)
            var randEnergies = randomIntFromInterval(18-energies,22-energies);
        else
            var randEnergies = randomIntFromInterval(22-energies);

        if((energies<22)&&(total<60)) {
            for (var i = 0; i < randEnergies; i++) {

                var randEnergy = randomIntFromInterval(1, 9);
                var idCarte = "#e" + randEnergy;
                $(idCarte).get(0).value++;
                $(idCarte).parent().children(".rond").html($(idCarte).val());
                $(idCarte).parent().children(".rond").show();
                $(idCarte).parent().children(".rond").css("background-color", "red");
                $(idCarte).parent().children(".rond").css("border", "2px solid white");
                total += 1;
                energies += 1;
                verif2();
            }
        }
        if(total<60) {
            for (var i = total; i < 60; i++) {

                var randEnergy = randomIntFromInterval(1, $('#pokemons').children().length);
                var idCarte = $('#pokemons > :nth-child(' + randEnergy + ') input');
                while($(idCarte).val()==4){
                    var randEnergy = randomIntFromInterval(1, $('#pokemons').children().length);
                    var idCarte = $('#pokemons > :nth-child(' + randEnergy + ') input');
                }
                console.log(randEnergies + " " + total);
                $(idCarte).get(0).value++;
                $(idCarte).parent().children(".rond").html($(idCarte).val());
                $(idCarte).parent().children(".rond").show();
                $(idCarte).parent().children(".rond").css("background-color", "red");
                $(idCarte).parent().children(".rond").css("border", "2px solid white");
                total += 1;
                pokemons += 1;
                verif2();
            }
        }

    });


    $("li").on('click', function () {


        if ($(this).text() == "Pokémons") {
            $("#pokemons").show();
            $(this).addClass("selected");


            $(".menu2").removeClass("selected");
            $(".menu3").removeClass("selected");

            $("#energies").hide();
            $("#trainer").hide();


        }
        else if ($(this).text() == "Energies") {
            $("#energies").show();
            $(this).addClass("selected");

            $("#pokemons").hide();

            $("#trainer").hide();

            $(".menu1").removeClass("selected");
            $(".menu3").removeClass("selected");

        }
        else if ($(this).text() == "Champions") {
            $("#trainer").show();
            $(this).addClass("selected");
            $("#pokemons").hide();
            $("#energies").hide();

            $(".menu2").removeClass("selected");
            $(".menu1").removeClass("selected");
        }
    });

    //clic gauche => ajouter carte
    $(".cardContent").click(function (event) {

        $('#sonClic')[0].play(); //Son au clic d'une carte

        var $input = $(this).children("input");


        if (((($input.val() < 4) && ($(this).parent().attr('id') == "pokemons"))
            || (($(this).parent().attr('id') == "energies") && bool_energies)
            || (($(this).parent().attr('id') == "trainer") && bool_trainer))
            && (bool_total) && !(ok)
        ) {
            $(this).addClass("purple");
            $input.val(+$input.val() + 1);
            $(this).children(".rond").html("<span>" + $input.val() + "</span>");
            $(this).children(".rond").css("border", "2px solid white");
            $(this).children(".rond").css("background-color", "red");

            total += 1;


            if ($(this).parent().attr('id') == "pokemons") {
                pokemons += 1;
            }
            else if (($(this).parent().attr('id') == "energies") && (bool_energies)) {
                energies += 1;
            }
            else if (($(this).parent().attr('id') == "trainer") && (bool_trainer)) {
                trainer += 1;
            }
        }

        verif2();

        // Active/Desactive bouton enregistrement
        console.log(total);
        if (total == nbCarteValide) { // Si 60 cartes sont selectionnees, on active le bouton de validation
            $("#envoiDeck").prop('disabled', false);
            //$("#envoiDeck").
        } else { // Sinon on desactive le bouton
            $("#envoiDeck").prop('disabled', true);
        }

    });

    //clic droit => supprimer carte
    $(".cardContent").bind("contextmenu", function (e) {
        var $input = $(this).children("input");
        if ($input.val() >= 1) {
            if ($(this).parent().attr('id') == "pokemons") {
                pokemons -= 1;
            }
            else if ($(this).parent().attr('id') == "energies") {
                energies -= 1;
            }
            else if ($(this).parent().attr('id') == "trainer") {
                trainer -= 1;
            }
            $input.val(+$input.val() - 1);
            total -= 1;
            $(this).children(".rond").text($input.val());

            if ($input.val() == 0) {
                $(this).children(".rond").text("");
                $(this).children(".rond").css("border", "0");
                $(this).children(".rond").css("background-color", "");
                if ($(this).hasClass("purple")) {
                    $(this).removeClass("purple");
                }
            }


        }
        verif2();

        // Active/Desactive bouton enregistrement
        console.log(total);
        if (total == nbCarteValide) { // Si 60 cartes sont selectionnees, on active le bouton de validation
            $("#envoiDeck").prop('disabled', false);
            //$("#envoiDeck").
        } else { // Sinon on desactive le bouton
            $("#envoiDeck").prop('disabled', true);
        }


        return false;
    });

    //verif conditions
    function verif2() {
        if (total > 0) {
            verif.show();

            if (total < 60) {
                verif.html("<span style='color:white;'>Nombre de cartes : " + total + "/60" + "</span><br>");
                ok = false;
                bool_total = true;
            }
            else if (total > 60) {
                verif.html("<span style='color:white;'>Trop de cartes.</span><br><br>");
                ok = false;
                bool_total = false;
            }
            else if (total == 59) {
                verif.html("<span style='color:green;'>Nombre de cartes OK.</span><br><br>");
                if (!(bool_energies) && !(bool_trainer) && !(bool_total)) {
                    ok = true;
                    bool_total = true;
                }
            }
            else {
                verif.html("<span style='color:green;'>Nombre de cartes OK.</span><br><br>");
                bool_total = false;
                if (!(bool_energies)
                        //&&!(bool_trainer)
                    && !(bool_total)) {
                    ok = true;

                }
            }


            if (energies < 18) {
                bool_energies = true;
                verif.append("<span style='color:white;'>Carte énergies : " + energies + " (18~22) </span><br><br>");
            }
            else if (energies > 22) {
                bool_energies = false;
                verif.append("<span style='color:red;'> Trop de cartes énergies. (" + (energies) + ") (18~22) </span><br><br>");
            }
            else {
                bool_energies = true;
                verif.append("<span style='color:green;'> Cartes énergies OK:  (" + (energies) + ") (18~22) </span><br><br>");
            }


            console.log(bool_total + " " + bool_energies);

            if ((60 - total) < (18 - energies)) {

                verif.append("<span style='color:red;'> Votre deck est déséquilibré, veuillez retirer des Pokémons afin d'ajouter des cartes energy </span><br><br>");
            }
            /*
             if(trainer<13) {
             bool_trainer = true;
             verif.append("<span style='color:red;'> Carte dresseur : "+ trainer + " (13~20)</span><br><br>");
             }
             else if(trainer>20){
             bool_trainer = false;
             verif.append("<span style='color:red;'> Trop de cartes dresseur. </span><br><br>");
             }
             else{
             bool_trainer = true;
             verif.append("<span style='color:green;'> Cartes Dresseurs OK. (" + (trainer) + ")</span><br><br>");
             }

             */


            if (ok) {
                $("#bouton").fadeIn();
            } else {
                $("#bouton").fadeOut();
            }
        }
        else {
            verif.hide();
        }
    }


    $("#envoiDeck").click(function () {
        var indice = 0;
        $("input").each(function () {
            var nb = $(this).val();

            if (nb > 0) {
                for (var i = 0; i < nb; i++) {

                    if ($(this).parent().attr("expansion") == "XY")
                        envoi[indice] = {"num_carte": parseInt($(this).attr("id")), "id_deck": 1, "id_generation": 146};
                    else if ($(this).parent().attr("expansion") == "Generations")
                        envoi[indice] = {"num_carte": parseInt($(this).attr("id")), "id_deck": 1, "id_generation": 83};
                    else if ($(this).parent().attr("expansion") == "Poings Furieux")
                        envoi[indice] = {"num_carte": parseInt($(this).attr("id")), "id_deck": 1, "id_generation": 111};
                    else if ($(this).parent().attr("expansion") == "Impact Des Destins")
                        envoi[indice] = {"num_carte": parseInt($(this).attr("id")), "id_deck": 1, "id_generation": 124};
                    else if ($(this).parent().attr("expansion") == "Origines Antiques")
                        envoi[indice] = {"num_carte": parseInt($(this).attr("id")), "id_deck": 1, "id_generation": 98};
                    else
                        envoi[indice] = {"num_carte": parseInt($(this).attr("id")), "id_deck": 1, "id_generation": 9}; //Cartes énergies
                    indice++;
                    console.log(envoi);
                }
            }
        });

        $.ajax({
            type: 'PUT',
            url: '/creation-deck',
            data: {
                tab: envoi
            },
            sucess: function (sucess) {
                alert('sucess');
                console.log('sucess');
            },
            err: function (err) {
                alert('err');
                console.log('err');
            }
        });
        window.location.replace("/menu");
    });


    $("#reload").click(function () {
        $("input").each(function (){

            $(this).val(0);

            $(this).parent().children(".rond").html($(this).val());
            alert($(this).val());
            $(this).parent().children(".rond").text("");
            $(this).parent().children(".rond").css("border", "0");
            $(this).parent().children(".rond").css("background-color", "");
        });
        total =0;
        energies = 0;
        pokemons = 0;
        verif2();
    });

});