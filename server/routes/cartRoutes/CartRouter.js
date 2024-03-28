const cartRouter = require("express").Router();
const Authorization = require("../../middleware/authorization");
const { Cart, CartItem } = require("../../models/Cart");
const { Types } = require("mongoose");

const findCart = async (userId) => {
  let cartSearchResult = await Cart.findOne({ userId: userId });
  return cartSearchResult;
};

const getCart = async (req, res) => {
  console.log("In get cart");
  try {
    let cartData = findCart(res.locals.userId);
    return res.status(200).send({ cart: cartData });
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const addItem = async (req, res) => {
  console.log("In add an item");
  try {
    let { productId, quantity } = req.body;
    let cart = findCart(res.locals.userId);

    if (!cart) {
      cart = await new Cart({ userId: userId, total: 0, items: [] });
    }

    let itemInCart = await cart.items.find(
      (item) => item.productId == productId
    );

    if (!itemInCart) {
      let newItem = await new CartItem({
        productId: productId,
        quantity: quantity,
      });
      cart.items.push(newItem);
    } 
    
    else {
      itemInCart.quantity += quantity;
    }
    await cart.save();

    return res.status(200).send({ message: cart });
  } catch (err) {
    console.log("An error occured", err);
    return res.status(400).send({ message: err });
  }
};

const removeItem = async (req, res) => {
  console.log("In remove an item");
  const productId = new Types.ObjectId(req.params.productId);
  try {
    let userId = res.locals.id;
    let cartData = await Cart.findOneAndUpdate(
      { userId: userId },
      { $pull: { items: { productId: productId } } },
      { safe: true, multi: true }
    );
    await cartData.save();
    return res.status(200).send({ message: "Deleted Successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
};

const changeQuantity = async (req, res) => {};

const emptyCart = async (req, res) => {
  try {
    let cart = Cart.findOneAndDelete({ userId: res.locals.userId });
    return res.status(200).send({ message: "Cart emptied" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
};

cartRouter.get("/", Authorization, getCart);
cartRouter.post("/", Authorization, addItem);
cartRouter.delete("/:productId", Authorization, removeItem);
cartRouter.delete("/", Authorization, emptyCart);

module.exports = cartRouter;
