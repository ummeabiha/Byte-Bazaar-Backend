const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { shop_model } = require("../../../models/UserPanel/shop");

router.delete("/", async (req, res) => {
  try {
    const { _id, id } = req.body;
    console.log(`Attempting to delete product with ID ${_id}`);

    // Check if the ID is valid before attempting to delete
    if (!_id || !id) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    // Attempt to delete the product
    const deletedProduct = await shop_model.findByIdAndDelete(_id);
    // const deletedProductId = await shop_model.findById(id);

    // Check if a product was deleted
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Delete the associated image file
    const imageFolderPath = path.join(__dirname, "../../../uploads/products");
    const imageName = `${id}.png`;
    const imagePath = path.join(imageFolderPath, imageName);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`Deleted image file: ${imagePath}`);
    }
    res
      .status(200)
      .json({ message: "Product Deleted Successfully.", deletedProduct });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
