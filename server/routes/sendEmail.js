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

// Main function to send recovery email
async function sendEmail({ recipientEmail, link }) {
  try {
    // Email configuration
    const mailConfig = {
      from: "ummeabihanotes@gmail.com", // Sender email address
      to: recipientEmail,
      subject: "ByteBazaar Password Recovery",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>ByteBazaar - OTP Email</title>
</head>
<body>
  <div>
    <h2>ByteBazaar Password Recovery</h2>
    <p>Hi,</p>
    <p>Thank you for choosing ByteBazaar. Click the link below to reset your password:</p>
    <a href="${link}">Reset Password</a>
    <p><strong>Warning:</strong> Do not share this link with anyone for security reasons.</p>
    <p>Regards,<br />ByteBazaar Team</p>
  </div>
</body>
</html>`,
    };

    // Send email using the SendGrid transporter
    const info = await transporter.sendMail(mailConfig);
    console.log("Email sent:", info.messageId);
    return { message: "Email sent successfully" };
  } catch (error) {
    console.log("Error sending email:", error);
    throw new Error("An error occurred while sending the email");
  }
}

module.exports = { sendEmail };
