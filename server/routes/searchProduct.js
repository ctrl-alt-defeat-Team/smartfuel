var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

router.get('/barcode/:productQR', async (req, res) => {
    console.log('searching product');
    console.log(req.body);
    const productQR = req.params.productQR;
    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${productQR}`);
        const data = await response.json();
        res.status(200).json(data.product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});
router.get('/name/:name', async (req, res) => {
    console.log('searching product');
    console.log(req.body);
    const productName = req.params.name;
    try {
        const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&search_simple=1&action=process&json=1`);
        console.log(response);
        const data = await response.json();
        res.status(200).json(data.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

module.exports = router;
