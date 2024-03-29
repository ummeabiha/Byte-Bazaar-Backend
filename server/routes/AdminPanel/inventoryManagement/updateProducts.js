const express = require("express");
const router = express.Router();
const { shop_model } = require("../../../models/UserPanel/shop");

// Update a product
router.put("/", async (req, res) => {
  const { id } = req.params;
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

    const updatedProduct = await shop_model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    // Handle validation errors and other unexpected errors
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
