const express = require("express");
const { user_model } = require("../../../models/UserPanel/userInfo");
const { addOtpToDb } = require("../otpHandling/addOtpToDb");
const router = express.Router();

// Route to handle forgot password
router.post("/", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    if (email.length > 30) {
      return res.json({ status: "Email must be a valid email address." });
    }

    const oldUser = await user_model.findOne({ email });
    if (!oldUser) {
      console.log("Email Not Exists");
      return res.json({ status: "User Does Not Exist." });
    }

    await addOtpToDb({ recipientEmail: email });
    console.log("Sent to OTP verification.");
    res.json({ status: "Email sent for OTP verification", email });
  } catch (error) {
    console.error("Error sending recovery email:", error);
    res.status(500).send("Failed to send email.");
  }
});

module.exports = router;
