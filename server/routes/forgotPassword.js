const express = require("express");
// const jwt = require("jsonwebtoken");
const { user_model } = require("../models/userInfo");
const { sendEmail } = require("./sendEmail");

const router = express.Router();

// Route to handle forgot password
router.post("/", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const oldUser = await user_model.findOne({ email });
    if (!oldUser) {
      console.log("Email Not Exists")
      return res.json({ status: "User Not Exists!!" });
    }
    // const secret = process.env.JWTPRIVATEKEY + oldUser.password;
    // const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
    //   expiresIn: "5m",
    // });
    const link = `http://localhost:5173/bytebazaar/reset-password/`;

    // Call the sendEmail function with the link and token
    const sendEmailResponse = await sendEmail({
      recipientEmail: email,
      link,
      // token,
    });

    console.log(link);
    res.send({ status: "Email sent successfully", data: sendEmailResponse });
  } catch (error) {
    console.error("Error sending recovery email:", error);
    res.status(500).send("Failed to send recovery email");
  }
});

module.exports = router;
