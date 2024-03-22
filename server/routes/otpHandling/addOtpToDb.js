const bcrypt = require("bcrypt");
const {userOTPVerification_model} = require("../../models/userOTPVerification");
const { sendOTPEmail } = require("./sendOtpEmail");

const addOtpToDb = async ({ recipientEmail }) => {
  try {
    // Generating 4 digit random number for OTP
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    console.log(`I am OTP ${otp}`);
    // Encrypting the OTP
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedOTP = await bcrypt.hash(otp, salt);

    // Adding record to database
    const newOTPVerification = await new userOTPVerification_model({
      email: recipientEmail,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
    });

    // Save record
    await newOTPVerification.save();
    console.log("Saved the OTP record in DB");

    // Send OTP email using sendOTPEmail function
    await sendOTPEmail({ recipientEmail, otp });
    return { message: "OTP email sent successfully" };
    
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("An error occurred while sending the OTP email");
  }
};

module.exports = { addOtpToDb };

