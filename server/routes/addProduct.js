const express = require('express');
var router = express.Router();
var verifyToken = require('./verifyToken');
var Product = require('../models/product');
var getUser = require('../functions/getUser');
const Joi = require('joi');

const productSchema = Joi.object({
    product_name: Joi.string().required(),
    barcode: Joi.string().required(),
    brands: Joi.string().required(),
    image_front_url: Joi.string().required(),
    nutriments: Joi.object({
      energy: Joi.number().required(),
      fat: Joi.number().required(),
      carbohydrates: Joi.number().required(),
      sugars: Joi.number().required(),
      fiber: Joi.number().required(),
      proteins: Joi.number().required(),
      salt: Joi.number().required(),
    }).required(),
    nutriscore_grade: Joi.string().required()
  });

router.post('/',verifyToken ,async (req, res) => {
    console.log(req.body);
    try{
      console.log(req.body);
      console.log("----------");
        const { error, value } = productSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
        Product.create(req.body);
        res.json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = router;
