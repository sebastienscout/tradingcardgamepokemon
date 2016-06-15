/**
 * Created by Alexis on 08/06/2016.
 */

var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');

/*
router.get('/?deconnexion=true', function(req, res, next) {
    req.session.destroy();
});
*/



/* GET connexion page. */
router.get('/', function(req, res, next) {
    console.log("test");

    var p1 = req.param("deconnexion");
    if(p1 == "true"){   // Si le client veut se deconnecter
        req.session.destroy();
    }else if(req.session._id && req.session.username && req.session.mail){  // Si connecte, le client est redirige vers le menu
        res.redirect('/menu');
    }else { // Sinon
        res.render('connexion');
    }

    res.redirect('connexion');

});

/* POST connexion page. */
router.post('/', function(req, res, next) {
    // Codes erreurs
    // 3 = existe pas
    // 4 = non valide

    req.app.db.models.User.count({'username':req.param('username')}, function(err, username) {
        if(username <= 0){ // Pseudo existe pas
            res.render('connexion', {pseudo: 3});
        }else{ // Pseudo existe
            req.app.db.models.User.findOne({'username':req.param('username')}, function(err, user){
                if(user.password != req.param('password')){ // Mot de passe invalide
                    res.render('connexion', {password: 4});
                }else{ // Mot de passe valide
                    req.session._id = user._id;
                    req.session.username = user.username;
                    req.session.mail = user.mail;

                    res.redirect('/menu');
                    //console.log(req.session);
                }
            });
        }
    });
});



module.exports = router;
