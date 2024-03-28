const express = require("express");
const router = express.Router();
const { addOtpToDb } = require("./addOtpToDb");

// Resend OTP
router.post("/", async (req, res) => {
  try {
    const { recipientEmail } = req.body;

    if (!recipientEmail) {
      return res.status(404).send("An Errror Occured, Email Not Found");
    }

    await addOtpToDb({ recipientEmail });
    return res.send({ message: "OTP Resent successfully" });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
