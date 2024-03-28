const express = require('express');
const { shop_model } = require('../../../models/UserPanel/shop');

const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await shop_model.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post('/products', async (req, res) => {
  try {
    const newProduct = new shop_model(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Create many new products all at once for lazy peeps
router.post('/api/products/insertmany', async (req, res) => {
  try {
    const items = req.body; // Array of items to insert
    const result = await shop_model.insertMany(items);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product
router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await shop_model.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await shop_model.findOneAndUpdate(
      { _id: id },
      { $set: req.body }, 
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/products/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await shop_model.findByIdAndDelete(id);
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


