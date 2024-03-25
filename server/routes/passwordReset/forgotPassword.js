const express = require("express");
const { user_model } = require("../../models/userInfo");
const { addOtpToDb } = require("../otpHandling/addOtpToDb");
const router = express.Router();

// Route to handle forgot password
router.post("/", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const oldUser = await user_model.findOne({ email });
    if (!oldUser) {
      console.log("Email Not Exists");
      return res.json({ status: "User Not Exists!!" });
    }

    await addOtpToDb({ recipientEmail: email });
    console.log("Sent to OTP verification");
    res.json({ status: "Email sent for OTP verification", email });
  } catch (error) {
    console.error("Error sending recovery email:", error);
    res.status(500).send("Failed to send recovery email");
  }
});

module.exports = router;
