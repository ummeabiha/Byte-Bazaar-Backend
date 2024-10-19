const express = require("express");
const router = express.Router();
const { user_model } = require("../../../models/UserPanel/userInfo");
const Redis = require("ioredis");

// Initialize Redis client
const redis = new Redis();

// Define a cache duration (in seconds)
const CACHE_EXPIRATION_TIME = 3600; // 1 hour

module.exports = router.get("/", async (req, res) => {
  try {
    // Check if data exists in the cache
    const cachedUsers = await redis.get("users");

    if (cachedUsers) {
      // If cached data exists, parse and return it
      const users = JSON.parse(cachedUsers);
      return res.status(200).send({
        data: users,
        message: "Users fetched successfully from Cache",
      });
    }

    // If not cached, fetch from the database
    const users = await user_model.find();

    // Check if there are users in the database
    if (!users || users.length === 0) {
      return res.status(404).send({ message: "No users found" });
    }

    // Store the fetched data in Redis cache
    await redis.set(
      "users",
      JSON.stringify(users),
      "EX",
      CACHE_EXPIRATION_TIME
    );

    // Return the list of users as a response
    res.status(200).send({
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
