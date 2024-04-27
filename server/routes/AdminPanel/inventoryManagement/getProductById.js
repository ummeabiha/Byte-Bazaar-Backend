const router = require("express").Router();
const { shop_model } = require("../../../models/UserPanel/shop");

module.exports = router.post("/", async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);

    if (!_id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    const product = await shop_model.findOne({ _id });
    if (!product) {
      return res.status(404).send({ message: "No Product Found" });
    }

    res
      .status(200)
      .send({ data: product, message: "Product fetched successfully" });
  } catch (error) {
    console.error("Error Fetching Product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
