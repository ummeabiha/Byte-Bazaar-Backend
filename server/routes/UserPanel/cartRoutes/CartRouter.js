const cartRouter = require("express").Router();
const Authorization = require("../../../middleware/authorization");
const { Cart, CartItem } = require("../../../models/UserPanel/Cart");
const { Types } = require("mongoose");
const { shop_model } = require("../../../models/UserPanel/shop");

const findCart = (userId) => {
  let cartSearchResult = Cart.findOne({ userId: userId });
  return cartSearchResult;
};

const getCart = async (req, res) => {
  console.log("In get cart");
  try {
    let cartData = await findCart(res.locals.id).populate("items.productId");
    return res.status(200).send({ cart: cartData });
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};

const addItem = async (req, res) => {
  console.log("In add an item");
  try {
    let { productId, quantity, price } = req.body;
    let userId = res.locals.id;
    let cart = await findCart(userId);
    let product = await shop_model.findById({ _id: productId });

    if (!cart) {
      cart = await new Cart({ userId: userId, total: 0, items: [] });
    }

    let itemInCart = await cart.items.find(
      (item) => item.productId == productId
    );

    if (!itemInCart) {
      if (quantity > product.quantity) {
        console.log("out of stock");
        return res.status(400).send({ message: "Product out of stock" });
      }

      let newItem = await new CartItem({
        productId: productId,
        quantity: quantity,
      });
      cart.items.push(newItem);
      cart.total += quantity * price;
    } else {
      itemInCart.quantity += quantity;
      if (itemInCart.quantity > product.quantity) {
        console.log("out of stock");
        return res.status(400).send({ message: "Product out of stock" });
      }
      cart.total += quantity * price;
    }
    await cart.save();
    console.log(cart);

    return res.status(201).send({
      cart: cart,
      total: cart.total,
      message: "Item added to cart",
    });
  } catch (err) {
    console.log("An error occured. Kindly retry later.", err);
    return res
      .status(500)
      .send({ message: "An error occured. Kindly retry later." });
  }
};

const removeItem = async (req, res) => {
  console.log("In remove an item");
  const productId = new Types.ObjectId(req.params.productId);
  let priceTobeRemoved = req.query.subTotal;
  try {
    let userId = res.locals.id;
    let cartData = await Cart.findOneAndUpdate(
      { userId: userId },
      { $pull: { items: { productId: productId } } },
      { safe: true, multi: true }
    );
    cartData.total -= priceTobeRemoved;
    await cartData.save();
    return res.status(200).send({
      message: "Deleted Successfully.",
      cart: cartData,
      newTotal: cartData.total,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
};

const DecrementQuantity = async (req, res) => {
  try {
    let { productId, subTotal, updateType } = req.body;
    let cart = await findCart(res.locals.id);
    let product = await shop_model.findById({ _id: productId });
    let itemInCart = await cart.items.find(
      (item) => item.productId == productId
    );
    if (updateType == "decrement") {
      if (itemInCart.quantity > 1) {
        itemInCart.quantity -= 1;
        cart.total -= subTotal;
      } else {
        return res
          .status(400)
          .send({ message: "Item cannot be decremented further" });
      }
    } else {
      if (itemInCart.quantity + 1 <= product.quantity) {
        itemInCart.quantity += 1;
        cart.total += subTotal;
      } else {
        return res.status(400).send({ message: "Item Out Of Stock" });
      }
    }
    await cart.save();
    return res.status(201).send({
      cart: cart,
      total: cart.total,
      message: "Item added to cart",
    });
  } catch (err) {
    console.log("An error occured. Kindly retry later.", err);
    return res
      .status(500)
      .send({ message: "An error occured. Kindly retry later." });
  }
};

const emptyCart = async (req, res) => {
  try {
    let cart = await Cart.findOneAndDelete({ userId: res.locals.id });

    // cart.save();
    return res.status(200).send({ message: "Cart emptied" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
};

cartRouter.get("/", Authorization, getCart);
cartRouter.post("/", Authorization, addItem);
cartRouter.delete("/:productId", Authorization, removeItem);
cartRouter.put("/", Authorization, DecrementQuantity);
cartRouter.delete("/", Authorization, emptyCart);

module.exports = cartRouter;
