
const mongoose = require('mongoose');

// to connect
const plm = require('passport-local-mongoose');

const schemaDefinition = {
    name: {
        username: String,
        password: String,
        oauthId: String,
        oauthProvider: String,
        created: Date
    }
};


var userSchema = new mongoose.Schema(schemaDefinition);
//to add function to the model
userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema)