const express = require("express");
const router = express.Router();
const { shop_model } = require("../../../models/UserPanel/shop");
const { validate } = require("../../../validations/editProdValidation");
const fs = require("fs");
const path = require("path");

// Decoding Base64 data into binary format
const saveFileFromBase64 = (base64Data, targetPath) => {
  const fileBuffer = Buffer.from(base64Data, "base64");
  fs.writeFileSync(targetPath, fileBuffer);
};

router.put("/", async (req, res) => {
  try {
    const {
      _id,
      id,
      price,
      name,
      category,
      brand,
      quantity,
      rating,
      description,
      image,
    } = req.body;

    const { error } = validate({
      _id,
      id,
      name,
      description,
      category,
      brand,
      quantity,
      image,
      price,
      rating,
    });

    if (error) {
      console.log(error);
      return res.status(400).send({ message: error.details[0].message });
    }

    console.log(quantity);

    const convertedPrice = parseInt(price, 10);
    const convertedRating = parseFloat(rating);

    let imagePath = "";
    if (image) {
      const imageFolderPath = path.join(__dirname, "../../../uploads/products");
      const imageName = `${id}.png`;
      imagePath = path.join(imageFolderPath, imageName);
      saveFileFromBase64(image, imagePath);
    }

    const updatedProductData = {
      _id,
      id,
      name,
      price: convertedPrice,
      image: image ? `/uploads/products/${id}.png` : null,
      category,
      brand,
      quantity,
      rating: convertedRating,
      description,
    };

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

    res
      .status(200)
      .json({ message: "Product Edited Successfully.", updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
