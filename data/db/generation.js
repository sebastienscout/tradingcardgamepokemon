exports = module.exports = function(app, mongoose) {
    var generationSchema = new mongoose.Schema({
        num_generation: Number,
        nom_generation: String
    });

    app.db.model('Generation', generationSchema);
};


