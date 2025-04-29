// Generate OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
  }
  
  const otp = generateOTP();
  console.log(otp);

module.exports = { generateOTP };
