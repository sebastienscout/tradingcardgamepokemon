/**
 * Created by mhabinka on 09/06/16.
 */

jQuery(document).ready(function(){

    var total = 0;
    var pokemons = 0;
    var energies = 0;
    var trainer = 0;
    var verif =  $("#donnees");
    var bool_energies = true;
    var bool_trainer = true;
    var bool_total = true
    var ok = false;

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

    //clic gauche => ajouter carte
    $(".cardContent").click(function(event) {

            var $input = $(this).children("input");


            if(((($input.val() < 4)&&($(this).parent().attr('id') == "pokemons"))
                ||(($(this).parent().attr('id') == "energies")&&bool_energies)
                ||(($(this).parent().attr('id') == "trainer")&&bool_trainer))
                &&(bool_total)
                 ){
                $(this).addClass("purple");
                $input.val(+$input.val() + 1);
                total += 1;
            }

            if($(this).parent().attr('id') == "pokemons"){
                pokemons +=1;
            }
            else if(($(this).parent().attr('id') == "energies")&&(bool_energies)){
                energies +=1;
            }
            else if(($(this).parent().attr('id') == "trainer")&&(bool_trainer)){
                trainer +=1;
            }

            verif2();

    });

    //clic droit => supprimer carte
    $(".cardContent").bind("contextmenu",function(e){
        var $input = $(this).children("input");
            if ($input.val() >=1) {
                if($(this).parent().attr('id') == "pokemons"){
                    pokemons -=1;
                }
                else if($(this).parent().attr('id') == "energies"){
                    energies -=1;
                }
                else if($(this).parent().attr('id') == "trainer"){
                    trainer -=1;
                }
                $input.val(+$input.val() - 1);
                total -= 1;

                if ($input.val() == 0) {
                    $input.val("");
                    if ($(this).hasClass("purple")) {
                        $(this).removeClass("purple");
                    }
                }
            }

            verif2();

            return false;
        });

    //verif conditions
    function verif2(){
            if(total>0){
                verif.show();

                 if (total<60){
                    verif.html("<span style='color:red;'>"+ (60-total)+" cartes.</span><br><br>");
                     ok = false;
                     bool_total = true;
                 }
                 else if (total>60){
                     verif.html("<span style='color:red;'>Trop de cartes.</span><br><br>");
                     ok = false;
                     bool_total = false;
                 }
                 else{
                    verif.html("<span style='color:green;'>Nombre de cartes OK.</span><br><br>");
                     if (!(bool_energies)&&!(bool_trainer)&&!(bool_total)){
                         ok = true;
                         bool_total = false;
                     }
                 }



                if(energies<18){
                    bool_energies = true;
                    verif.append("<span style='color:red;'> "+(18 - energies) + " à " + (22 - energies) + " Energies. </span><br><br>");
                }
                else if (energies>22){
                    bool_energies = false;
                    verif.append("<span style='color:red;'> Trop de cartes énergies. </span><br><br>");
                }
                else{
                    bool_energies = false;
                    verif.append("<span style='color:green;'> Cartes Energies OK. (" + (energies) + ") </span><br><br>");
                }




                if(trainer<13) {
                    bool_trainer = true;
                    verif.append("<span style='color:red;'> " + (13 - trainer) + " à " + (20 - trainer) + " Dresseurs.</span><br><br>");
                }
                else if(trainer>20){
                    bool_trainer = false;
                    verif.append("<span style='color:red;'> Trop de cartes dresseur. </span><br><br>");
                }
                else{
                    bool_trainer = false;
                    verif.append("<span style='color:green;'> Cartes Dresseurs OK. (" + (trainer) + ")</span><br><br>");
                }




                if (ok){
                    $("#bouton").fadeIn();
                }else{
                    $("#bouton").fadeOut();
                }
            }
            else{
                verif.hide();
            }
        }


    $("#bouton").click(function(){
       window.location.replace("/jeu");
    });
});

