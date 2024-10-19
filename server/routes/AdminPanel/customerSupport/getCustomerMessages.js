const express = require("express");
const router = express.Router();
const { support_model } = require("../../../models/UserPanel/customerSupport");
const Redis = require("ioredis");

const redis = new Redis();

const CACHE_EXPIRATION_TIME = 3600; 

module.exports = router.get("/", async (req, res) => {
  try {
    const cachedUsers = await redis.get("customerQueries");

    if (cachedUsers) {
      const users = JSON.parse(cachedUsers);
      return res.status(200).send({
        data: users,
        message: "Customer Queries Fetched Successfully from Cache",
      });
    }

    const users = await support_model.find();

    if (!users || users.length === 0) {
      return res.status(404).send({ message: "No Customer Queries" });
    }

    await redis.set(
      "customerQueries",
      JSON.stringify(users),
      "EX",
      CACHE_EXPIRATION_TIME
    );

    res.status(200).send({
      data: users,
      message: "Customer Queries Fetched Successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
