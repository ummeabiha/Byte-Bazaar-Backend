// const express = require("express");
// const router = express.Router();
// const { shop_model } = require("../../../models/UserPanel/shop");
// const { user_model } = require("../../../models/UserPanel/userInfo");

// // Get all products
// module.exports = router.get("/", async (req, res) => {
//   try {
//     console.log("Fetching Products...");
//     const products = await user_model.find();
//     // Check if any products were found
//     if (!products || products.length === 0) {
//       return res.status(404).json({ message: "No products found." });
//     }

//     // Products found, send them in the response
//     res.status(200).json(products);
//   } catch (err) {
//     // Handle database and other unexpected errors
//     console.error("Error fetching products:", err);
//     res.status(500).json({ message: "Internal Server Error." });
//   }
// });


const router = require("express").Router();
const { shop_model } = require("../../../models/UserPanel/shop");
const { user_model } = require("../../../models/UserPanel/userInfo");

module.exports = router.get("/", async (req, res) => {
  try {
    // Query to fetch all users from the database
    const prods = await shop_model.find();

    // Check if there are users in the database
    if (!prods || prods.length === 0) {
      return res.status(404).send({ message: "No Products Found" });
    }

    // Return the list of users as a response
    res
      .status(200)
      .send({ data: prods, message: "Products fetched Successfully" });
  } catch (error) {
    console.error("Error Fetching Products:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
