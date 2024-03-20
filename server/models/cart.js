const mongoose = require('mongoose');

const cartSchema = {
    products: [
        {
            barcode: String,
            quantity: Number
        }
    ],
    date: Date
};

module.exports = mongoose.model('Cart', cartSchema);