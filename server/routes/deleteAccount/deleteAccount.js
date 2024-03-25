const router = require("express").Router();
const { user_model } = require("../../models/userInfo");

module.exports = router.post("/", async (req, res) => {
  try {
    const { userEmail, deleteAccount } = req.body;

    if (!deleteAccount) {
      // Update the isVerified field to false for the specified user email
      const updatedUser = await user_model.findOneAndUpdate(
        { email: userEmail },
        { $set: { isVerified: false } },
        { new: true } // Return the updated document
      );

      // Check if the user was found and updated
      if (!updatedUser) {
        return res.status(404).send({ message: "User Not Found" });
      }

      return res
        .status(200)
        .send({ message: "User verification status updated successfully" });
    }


  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
