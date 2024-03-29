const express = require("express");
const router = express.Router();
const { shop_model } = require("../../../models/UserPanel/shop");

router.delete("/", async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(`Attempting to delete ${_id}`);

    // Check if the ID is valid before attempting to delete
    if (!_id) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    // Attempt to delete the product
    const deletedProduct = await shop_model.findByIdAndDelete(_id);

    // Check if a product was deleted
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Product successfully deleted
    res.status(200).json(deletedProduct);
  } catch (err) {
    // Handle database and other unexpected errors
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
