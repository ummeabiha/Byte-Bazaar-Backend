const router = require("express").Router();
const { shop_model } = require("../../../models/UserPanel/shop");

module.exports = router.get("/", async (req, res) => {
  try {
    const prods = await shop_model.find();

    if (!prods || prods.length === 0) {
      return res.status(404).send({ message: "No Products Found" });
    }

    res
      .status(200)
      .send({ data: prods, message: "Products fetched Successfully" });
  } catch (error) {
    console.error("Error Fetching Products:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const product = await shop_model.findOne({ _id: id });
    if (!product || product.length === 0) {
      return res.status(404).send({ message: "No Products Found" });
    }

    res
      .status(200)
      .send({ data: product, message: "Products fetched Successfully" });
  } catch (error) {
    console.error("Error Fetching Products:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
