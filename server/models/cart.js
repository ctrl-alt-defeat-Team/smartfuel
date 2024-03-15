const mongoose = require('mongoose');

const cartSchema = {
    products: [
        {
            barcode: String,
            quantity: Number
        }
    ]
};

module.exports = mongoose.model('Cart', cartSchema);