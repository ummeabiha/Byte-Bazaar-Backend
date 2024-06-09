const mongoose = require("mongoose");
const { cartItem } = require("./Cart");

const Order = new mongoose.Schema({
  //Referencing userId to access user Info.
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userInfo",
  },

  //Gross Total amount including Taxes
  orderTotal: { type: Number, required: true },

  //Status of order: Pending, Canceled, Delivered or Out for Delivery
  orderStatus: { type: String, required: true },

  //Details relevant to shipping of the parcel
  shippingDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    address: { type: String, required: true },
    postalCode: { type: Number },
  },

  //Payment options:COD or payPal or any other.
  //Payment Status:Pending, Done or Canceled
  paymentDetails: {
    paymentOption: { type: String, required: true },
    paymentStatus: { type: String, required: true },
  },

  //Array in cart of items would be put here and then populated with respect to each product.
  orderedItems: [cartItem],

  //When was the order placed. Not really sure of this one will try and tell. -HX
  orderPlacementDate: { type: Date, default: Date.now },
});

const order = mongoose.model("order", Order);

module.exports = { order };
