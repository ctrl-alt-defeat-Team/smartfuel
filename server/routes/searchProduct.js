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
            var response3 = {};
            response3.product_name = response2.product_name;
            response3._id = response2.barcode;
            response3.allergens_tags = [""];
            response3.brands = response2.brands;
            response3.categories_tags = response2.categories_tags;
            response3.image_front_url = response2.image_front_url;
            response3.ingredients = response2.ingredients;
            response3.nutriments = response2.nutriments;
            response3.nutriscore_grade = response2.nutriscore_grade;    
            res.status(200).json(response3);
            return;
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
            var response3 = {};
            response3.product_name = product.product_name;
            response3._id = product.barcode;
            response3.allergens_tags = [""];
            response3.brands = product.brands;
            response3.categories_tags = product.categories_tags;
            response3.image_front_url = product.image_front_url;
            response3.ingredients = product.ingredients;
            response3.nutriments = product.nutriments;
            response3.nutriscore_grade = product.nutriscore_grade; 
            console.log("response3:", response3);  
            v.push(response3);
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
