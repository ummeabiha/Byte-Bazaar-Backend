require("dotenv").config();
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

// Create a SendGrid transporter
const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

// Main function to send OTP email
async function sendOTPEmail({ recipientEmail, otp }) {
  try {
    // Email configuration
    const mailConfig = {
      from: "ummeabihanotes@gmail.com", // Sender email address
      to: recipientEmail,
      subject: "ByteBazaar Password Recovery OTP",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ByteBazaar - OTP Email</title>
</head>
<body>
<div style="color: black !important;">
  <h2>ByteBazaar Password Recovery OTP</h2>
  <div>
    <p>Greetings, Valuable Customer</p>
    <p>Thank you for choosing ByteBazaar. Your account security is our top priority.</p>
    <p>Your OTP for password recovery is:</p>
  </div>
  <p style="color: purple !important;">${otp}</p> 
  <p style="color: red !important;"><strong>Warning:</strong> Do not share this OTP with anyone for security reasons.</p>
  <p><strong>Note:</strong> This OTP is only valid for 5 minutes and can be used once only. If you did not request this OTP, please disregard this message.</p>
  <p>If you have any questions or need further assistance, please contact our support team.</p>
  <p>Regards,<br />ByteBazaar Team</p>
</div>
</body>
</html>`,
    };
    // Send email using the SendGrid transporter
    const info = await transporter.sendMail(mailConfig);
    return { message: "OTP email sent successfully" };
  } catch (error) {
    console.log("Error sending email:", error);
    throw new Error("An error occurred while sending the OTP email");
  }
}

module.exports = { sendOTPEmail };
