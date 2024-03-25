const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  image: String,
  category: String,
  brand: String,
  rating: Number,
  description: String
});

const shop_model = mongoose.model("shop", shopSchema);
module.exports = { shop_model };
