const router = require("express").Router();
const { user_model } = require("../../../models/UserPanel/userInfo");

module.exports = router.delete("/", async (req, res) => {
  try {
    const { userEmail } = req.body;

    // Update the isActiveUser field to false for the specified user email
    const updatedUser = await user_model.findOneAndUpdate(
      { email: userEmail },
      { $set: { isActiveUser: false } },
      { new: true } // Return the updated document
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).send({ message: "User Not Found" });
    }

    return res
      .status(200)
      .send({ message: "User verification status updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
