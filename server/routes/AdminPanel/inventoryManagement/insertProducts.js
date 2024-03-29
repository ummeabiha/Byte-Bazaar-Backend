const express = require("express");
const router = express.Router();
const { shop_model } = require("../../../models/UserPanel/shop");

// Create a new product
module.exports = router.post("/", async (req, res) => {
  try {
    // Validate request body
    if (
      !req.body.name ||
      !req.body.brand ||
      !req.body.category ||
      !req.body.rating ||
      !req.body.description
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newProduct = new shop_model(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    // Handle validation errors and other unexpected errors
    console.error("Error creating product:", err);

    // Check for validation errors (e.g., duplicate key error)
    if (err.name === "ValidationError" || err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Validation Error: Duplicate key or invalid data." });
    }

    res.status(500).json({ message: "Internal Server Error." });
  }
});
