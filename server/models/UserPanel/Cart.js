const mongoose = require("mongoose");

const cartItem = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const CartInfo = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userInfo",
    required: true,
  },
  total: { type: Number },
  items: [cartItem],
});

const CartItem = mongoose.model("CartItem", cartItem);
const Cart = mongoose.model("Cart", CartInfo);
module.exports = { Cart, CartItem };
