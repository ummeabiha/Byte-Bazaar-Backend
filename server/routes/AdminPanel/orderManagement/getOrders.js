const router = require("express").Router();
const { user_model } = require("../../../models/UserPanel/userInfo");

module.exports = router.get("/", async (req, res) => {
  try {
    // Query to fetch all users from the database
    const users = await user_model.find();
            
    // Check if there are users in the database
    if (!users || users.length === 0) {
      return res.status(404).send({ message: "No users found" });
    }

    // Return the list of users as a response
    res
      .status(200)
      .send({ data: users, message: "Users fetched successfully" });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
