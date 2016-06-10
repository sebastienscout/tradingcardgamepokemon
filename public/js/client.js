/**
 * Created by Harinck Aurelien on 08/06/2016.
 */
    var socket = io.connect('http://localhost:3000');
    // On demande le pseudo au visiteur...
    var pseudo = prompt('Quel est votre pseudo ?');
    // Et on l'envoie avec le signal "petit_nouveau" (pour le différencier de "message")
    socket.emit('petit_nouveau', pseudo);

    // On affiche une boîte de dialogue quand le serveur nous envoie un "message"
    socket.on('message', function(message) {
        //alert('Le serveur a un message pour vous : ' + message);
    });

    // Lorsqu'on clique sur le bouton, on envoie un "message" au serveur
    $('#poke').click(function () {
        socket.emit('message', 'Salut serveur, ça va ?');
    });