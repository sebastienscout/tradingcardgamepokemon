/**
 * Created by mhabinka on 09/06/16.
 */

jQuery(document).ready(function(){

    var total = 0;
    var pokemons = 0;
    var energies = 0;
    var trainer = 0;
    var verif =  $("#donnees");

    $("li").on('click', function() {

        if ( $(this).text() == "Pokémons" ){
            $("#pokemons").show();
            $(this).addClass("selected");


            $(".menu2").removeClass("selected");
            $(".menu3").removeClass("selected");

            $("#energies").hide();
            $("#trainer").hide();


        }
        else if ( $(this).text() == "Energies" ){
            $("#energies").show();
            $(this).addClass("selected");

            $("#pokemons").hide();

            $("#trainer").hide();

            $(".menu1").removeClass("selected");
            $(".menu3").removeClass("selected");

        }
        else if ( $(this).text() == "Champions" ){
            $("#trainer").show();
            $(this).addClass("selected");
            $("#pokemons").hide();
            $("#energies").hide();

            $(".menu2").removeClass("selected");
            $(".menu1").removeClass("selected");
        }
    });

    $(".cardContent").click(function(event) {



            verif.text("");
            if ($(this).hasClass("purple")) {
                $(this).removeClass("purple");
                total -= 1;
            }
            else {
                $(this).addClass("purple");
                total += 1;
            }

            if($(this).parent().attr('id') == "pokemons"){
                pokemons +=1;
            }
            else if($(this).parent().attr('id') == "energies"){
                energies +=1;
            }
            else if($(this).parent().attr('id') == "trainer"){
                trainer +=1;
            }

            if(total>0){

                verif.show();
                verif.css("color","red");
                verif.css("display","inline-block");
                verif.append("Il vous reste à sélectionner "+ (60-total)+" cartes.<br>");
                verif.append("Vous devriez sélectionner "+ (18-energies)+" à "+(22-energies)+" cartes Energies supplémentaires.<br>");
                verif.append("Vous devriez sélectionner "+ (13-trainer)+" à "+(20-trainer)+" cartes Dresseur supplémentaires.<br>");
            }
            else{
                verif.hide();
            }

    });

    $(".cardContent").bind("contextmenu",function(e){
        //Votre code ici (par exemple votre menu contextuel
        //Puis désactivation du menu par défaut
        return false;
    });


});