const router = require("express").Router();
const { support_model } = require("../../../models/UserPanel/customerSupport");

module.exports = router.get("/", async (req, res) => {
  try {
    // Query to fetch all users from the database
    const users = await support_model.find();

    // Check if there are user records in the database
    if (!users || users.length === 0) {
      return res.status(404).send({ message: "No Customer Queries" });
    }

    // Return the list of users as a response
    res
      .status(200)
      .send({ data: users, message: "Customer Queries Fetched Successfully" });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
