const express = require("express");
const router = express.Router();
const { order } = require("../../../models/UserPanel/order");
const { user_model } = require("../../../models/UserPanel/userInfo");
const Redis = require("ioredis");

// Initialize Redis client
const redis = new Redis();

// Define a cache duration (in seconds)
const CACHE_EXPIRATION_TIME = 3600; // 1 hour

module.exports = router.get("/", async (req, res) => {
  try {
    // Check if data exists in the cache
    const cachedOrders = await redis.get("orders");

    if (cachedOrders) {
      // If cached data exists, parse and return it
      const orders = JSON.parse(cachedOrders);
      return res.status(200).send({
        data: orders,
        message: "Orders fetched successfully from Cache",
      });
    }

    // If not cached, fetch from the database
    const orders = await order.find();

    // Check if there are orders in the database
    if (!orders || orders.length === 0) {
      return res.status(404).send({ message: "No orders found" });
    }

    // Store the fetched data in Redis cache
    await redis.set(
      "orders",
      JSON.stringify(orders),
      "EX",
      CACHE_EXPIRATION_TIME
    );

    // Return the list of orders as a response
    res.status(200).send({
      data: orders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
