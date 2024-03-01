const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
    id: Number,
    name: String,
    owner: String,
    members: [],
});


module.exports = mongoose.model('Family', familySchema);