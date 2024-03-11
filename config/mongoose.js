

const mongoose = require('mongoose');
const env = require('../config/env')
mongoose.connect(`mongodb://127.0.0.1/${env.db}`);
console.log("db name:-",env.db);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;