const express=require('express')
const dotenv=require('dotenv')
const app=express();
const cors=require('cors')
const authRoutes=require('./routes/authRoutes')
const connectDB=require('./config/db')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// const { generateOTP, sendOTPEmail } = require('./utils/generateOTP');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // allow Vite frontend
  credentials: true               // allow cookies / auth headers
}));
dotenv.config()


//Auth Routes
app.use('/api/auth',authRoutes)


// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;
//   const otp = generateOTP();

//   await sendOTPEmail(email, otp);
//   res.json({ message: 'OTP sent to your email address.' });
// });


// app.post('/verify-otp', async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   if (otp === storedOtp) {    
//     res.json({ message: 'Password successfully reset.' });
//   } else {
//     res.status(400).json({ message: 'Invalid OTP.' });
//   }
// });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

