exports = module.exports = function(app, mongoose) {
    var deckSchema = new mongoose.Schema({
        id_joueur: String
    });

    app.db.model('Deck', deckSchema);
};


