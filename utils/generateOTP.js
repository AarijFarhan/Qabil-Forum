// generateOTP.js
const transporter = require('./transporter');  // Correctly import the transporter

// Generate OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
  }
  
  const otp = generateOTP();
  console.log(otp);

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,  // Sender's email address
      to: email,                    // Receiver's email address
      subject: 'Your OTP for Password Reset',
      text: `Your One-Time Password (OTP) is: ${otp}. This OTP will expire in 5 minutes.`,
    };

    // Make sure transporter is correctly initialized
    console.log(transporter);

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully!', info);
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

module.exports = { generateOTP, sendOTPEmail };
