const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: String,
  barcode: String,
  brands: String,
  image_front_small_url: String,
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
});

module.exports = mongoose.model("Product", productSchema);