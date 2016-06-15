exports = module.exports = function(app, mongoose) {
    var partieSchema = new mongoose.Schema({
        id_joueur1: String,
        id_joueur2: String,
        id_vainqueur: String,
        date: String
    });

    app.db.model('Partie', partieSchema);
};


