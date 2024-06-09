const express = require("express");
const router = express.Router();
const { shop_model } = require("../../../models/UserPanel/shop");
const { validate } = require("../../../validations/addProdValidation");
const fs = require("fs");
const path = require("path");

// Decoding Base64 data into binary format
const saveFileFromBase64 = (base64Data, targetPath) => {
  const fileBuffer = Buffer.from(base64Data, "base64");
  fs.writeFileSync(targetPath, fileBuffer);
};

module.exports = router.post("/", async (req, res) => {
  try {
    console.log("Adding data to db");
    console.log(req.body);

    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { image, id, ...productData } = req.body;

    const existingProduct = await shop_model.findOne({ id });
    if (existingProduct) {
      return res.status(400).send({ message: "Product Id already exists." });
    }

    const imageFolderPath = path.join(__dirname, "../../../uploads/products");
    const imageName = `${id}.png`;
    const imagePath = path.join(imageFolderPath, imageName);
    saveFileFromBase64(image, imagePath);

    const productWithImage = {
      id: id,
      ...productData,
      image: `/uploads/products/${imageName}`,
    };

    const newProduct = new shop_model(productWithImage);
    await newProduct.save();

    res.status(201).json({
      message: "Product Added Successfully",
      imageUrl: productWithImage.image,
    });
  } catch (err) {
    console.error("Error creating product:", err);

    if (err.name === "ValidationError" || err.code === 11000) {
      return res
        .status(400)
        .send({ message: "Invalid data or Product Id already exists." });
    }

    res.status(500).send({ message: "Internal Server Error." });
  }
});
