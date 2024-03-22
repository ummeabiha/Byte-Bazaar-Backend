const mongoose = require("mongoose");

//Schema for User OTP Varification, to be stored in the database
const userOTPVerification = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
  },
  { collection: "userOTPVerification" }
);

const userOTPVerification_model = mongoose.model("userOTPVerification", userOTPVerification);
module.exports = { userOTPVerification_model };

