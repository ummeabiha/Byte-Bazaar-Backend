const router = require("express").Router();
const { order } = require("../../../models/UserPanel/order");
const { user_model } = require("../../../models/UserPanel/userInfo");

module.exports = router.get("/", async (req, res) => {
  try {
    // Query to fetch all users from the database
    const orders = await order.find();

    // Check if there are users in the database
    if (!orders || orders.length === 0) {
      return res.status(404).send({ message: "No orders found" });
    }

    // Return the list of users as a response
    res
      .status(200)
      .send({ data: orders, message: "Orders fetched successfully" });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
