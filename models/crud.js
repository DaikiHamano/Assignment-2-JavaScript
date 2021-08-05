

// Import mongoose
const mongoose = require('mongoose');
// Create a schema definition object
const schemaDefinition = {
    episode: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    member: {
        type: Number,
        required: true
    }
};


var projectSchema = new mongoose.Schema(schemaDefinition);
module.exports = mongoose.model('Database', projectSchema);;