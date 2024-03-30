const express = require("express");
const router = express.Router();
const { shop_model } = require("../../../models/UserPanel/shop");
const { validate } = require("../../../validations/prodValidation");

// Create a new product
module.exports = router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { error } = validate(req.body);
    // to handle errors in input data
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const newProduct = new shop_model(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product Added Successfully" });
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
