const express = require("express");
const router = express.Router();
const { shop_model } = require("../../../models/UserPanel/shop");
const { validate } = require("../../../validations/prodValidation");

router.put("/", async (req, res) => {
  try {
    const { _id, name, price, image, category, description, rating, brand } =
      req.body;

    // Convert price and rating to numbers
    const convertedPrice = parseInt(price, 10);
    const convertedRating = parseFloat(rating);

    const updatedProductData = {
      name,
      price: convertedPrice,
      image,
      category,
      description,
      rating: convertedRating,
      brand,
    };

    console.log("Received data:", updatedProductData);

    const { error } = validate(updatedProductData);
    // Handle errors in input data
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const updatedProduct = await shop_model.findByIdAndUpdate(
      _id,
      updatedProductData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    // Handle validation errors
    console.error("Error updating product:", err);

    // Check for validation errors
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error: Invalid data." });
    }

    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
