const express = require('express');
var router = express.Router();
const verifyToken = require("../functions/verifyToken");
var Cart = require('../models/cart');
var getUser = require('../functions/getUser');

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await getUser(req);
        const cartHistory = await Cart.find({ _id: { $in: user.shoppingHistory } });
        console.log(cartHistory);
        res.json(cartHistory);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
