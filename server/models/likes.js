const mongoose = require('mongoose');

const likeSchema = {
    barcode: String,
    userIDs: [],
};

module.exports = mongoose.model('Like', likeSchema);