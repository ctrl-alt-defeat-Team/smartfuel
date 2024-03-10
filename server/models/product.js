const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  barcode: String,
  brand: String,
  image: String,
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
