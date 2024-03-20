var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');
var Product = require('../models/product.js');

router.get('/barcode/:productQR', async (req, res) => {
    //console.log('searching product');
    //console.log(req.params.productQR);
    const productQR = req.params.productQR;
    try {
        var response2 = await Product.findOne({barcode: productQR});
        if(response2){
            response2.allergens_tags = [""];
            res.status(200).json(response2);
        }
        const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${productQR}`);
        const data = await response.json();
        res.status(200).json(data.product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
    //console.log('______');
});
router.get('/name/:name', async (req, res) => {
    console.log('searching product');
    console.log(req.params.name);
  
    const productName = req.params.name;
    try {
        const response2 = await Product.find({product_name: productName});
        console.log(response2);
        const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&search_simple=1&action=process&json=1`);
        //console.log(response);
        const v =[];

        const data = await response.json();
        response2.map((product) => {
            product.allergens_tags = [""];
            v.push(product);
        });
        console.log("response2:", response2);
        data.products.map((product) => {
            v.push(product);
        });
        res.status(200).json(v);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

module.exports = router;
