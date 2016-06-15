exports = module.exports = function (app, mongoose){
    require('./data/db/user')(app, mongoose);
    require('./data/db/partie')(app, mongoose);
    require('./data/db/deck')(app, mongoose);
    require('./data/db/carte')(app, mongoose);
    require('./data/db/generation')(app, mongoose);
};