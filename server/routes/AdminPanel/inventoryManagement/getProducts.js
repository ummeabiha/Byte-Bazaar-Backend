const router = require("express").Router();
const { shop_model } = require("../../../models/UserPanel/shop");
const Redis = require("ioredis");
const redisClient = new Redis();
const CACHE_EXPIRATION = 3600 * 24;

router.get("/", async (req, res) => {
  try {
    const cachedProds = await redisClient.get("shop_products"); 
    if (cachedProds) {
      res.setHeader("Cache-Control", "public, max-age=3600"); 
      return res.status(200).send({
        data: JSON.parse(cachedProds), 
        message: "Products fetched from cache",
      });
    }

    const prods = await shop_model.find(); 
    if (!prods || prods.length === 0) {
      return res.status(404).send({ message: "No Products Found" });
    }

    // Store the fetched data in Redis cache with an expiration time
    await redisClient.set(
      "shop_products",
      JSON.stringify(prods),
      "EX",
      CACHE_EXPIRATION
    );

    // Set HTTP caching headers for the response from the database
    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res
      .status(200)
      .send({ data: prods, message: "Products fetched Successfully" });
  } catch (error) {
    console.error("Error Fetching Products:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
