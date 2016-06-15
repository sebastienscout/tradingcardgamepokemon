exports = module.exports = function(app, mongoose) {
    var carteSchema = new mongoose.Schema({
        num_carte: Number,
        id_deck: String,
        id_generation: String
    });

    app.db.model('Carte', carteSchema);
};


