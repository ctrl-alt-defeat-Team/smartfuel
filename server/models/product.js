const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: String,
  barcode: String,
  brands: String,
  image_front_url: String,
  categories_tags: [String],
  ingredients: [String],
  nutriments: {
    energy: Number,
    fat: Number,
    carbohydrates: Number,
    sugars: Number,
    fiber: Number,
    proteins: Number,
    salt: Number,
  },
  nutriscore_grade: String,
  user_likes: Number,
  allergens_tags : [String],
  custom: Boolean,
  approved: Boolean,
});

module.exports = mongoose.model("Product", productSchema);
