const express = require('express');
var router = express.Router();
var verifyToken = require('./verifyToken');
var Cart = require('../models/cart');
var getUser = require('../functions/getUser');
router.post('/',verifyToken ,async (req, res) => {
    console.log(req.body);

    try{
        const user = await getUser(req,res);
        const cart = req.body.cartItems;
        const cartItems = [];
        for(let i = 0; i < cart.length; i++){
            const barcode = cart[i].slice(0, -1);
            const item = {
                barcode: barcode,
                quantity: cart[i].slice(-1)
            };
            cartItems.push(item);
        }
        console.log(cartItems);
         const newCart = new Cart({
             products: cartItems
         });
         await newCart.save();
        user.shoppingHistory.push(newCart._id); // Assuming you store cart IDs in shoppingHistory
        await user.save();
        console.log(user);
        res.json({ message: 'Cart created and user updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = router;
