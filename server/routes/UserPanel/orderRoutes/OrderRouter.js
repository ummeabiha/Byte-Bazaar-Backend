const orderRouter = require("express").Router();
const Authorization = require("../../../middleware/authorization");
const { Cart } = require("../../../models/UserPanel/Cart");
const { order } = require("../../../models/UserPanel/order");
const { shop_model } = require("../../../models/UserPanel/shop");

const checkInventory = async (requestedItems) => {
  for (let requesteditem of requestedItems) {
    let itemInInventory = await shop_model.findOne({
      _id: requesteditem.productId,
    });
    if (itemInInventory.quantity - requesteditem.quantity < 0) {
      return { itemOutofStock: true, item: itemInInventory };
    }
  }
  return { itemOutofStock: false };
};

const processOrder = async (req, res) => {
  console.log(req.body);
  let userId = res.locals.id;
  try {
    let userCart = await Cart.findOne({ userId: userId });
    console.log(userCart.items);
    let checkItemsAvailability = await checkInventory(userCart.items);
    if (checkItemsAvailability.itemOutofStock) {
      return res.status(401).send({
        message: "Items Out of Stock",
        item: checkItemsAvailability.item,
      });
    } else {
      for (let requestedItem of userCart.items) {
        await shop_model.findByIdAndUpdate(
          { _id: requestedItem.productId },
          { $inc: { quantity: -requestedItem.quantity } }
        );
      }
      let paymentStatus =
        req.body.paymentMethod == "cashOnDelivery" ? "pending" : "Done";
      let newOrderEntry = await new order({
        userId: userId,
        orderTotal: req.body.orderTotal,
        shippingDetails: req.body.shippingInfo,
        orderStatus: "pending",
        orderedItems: userCart.items,
        paymentDetails: {
          paymentOption: req.body.paymentMethod,
          paymentStatus: paymentStatus,
        },
      });

      await newOrderEntry.save();
      try {
        let cart = await Cart.findOneAndDelete({ userId: res.locals.id });
        return res.status(200).send({ message: "Success" });
      } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err });
      }
    }
  } catch (Err) {
    console.log(Err);
    return res
      .status(500)
      .send({ message: "An internal Server Error Occured." });
  }
};

orderRouter.post("/", Authorization, processOrder);

module.exports = orderRouter;
