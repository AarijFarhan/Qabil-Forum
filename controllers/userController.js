const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const cookieParser = require("cookie-parser");
const User = require('../models/userModel');
const Mentor = require('../models/mentorModel');
const { generateOTP } = require('../utils/generateOTP')


const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "aarijfarhan74@gmail.com",
    pass: "ieif jrfb sfrp lzco",
  }
})




//Register User

const registerUser = asyncHandler(async (req, res) => {
    const { name, studentId,email, password } = req.body;
    
    const userExists = await User.findOne({ studentId });
    if (userExists) {
        res.status(400);
        throw new Error("User already created account");
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = await User.create({
        name,
        studentId,
        password: hashedPassword,
        email
    });

    if (user) {
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json(user)

        res.status(201).json({ user: user._id });
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }
});



//Register Mentor

const registerMentor = asyncHandler(async (req, res) => {
    const { name, phoneNumber, email, password } = req.body;

    const mentorExists = await Mentor.findOne({ email });
    if (mentorExists) {
        res.status(400);
        throw new Error("Mentor already created account");
    } else {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const mentor = await Mentor.create({
            name,
            phoneNumber,
            password: hashedPassword,
            email
        });

        if (mentor) {
            const token = generateToken(mentor._id);
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });

            // Send only one response
            res.status(201).json({
                mentor: {
                    id: mentor._id,
                    name: mentor.name,
                    email: mentor.email,
                    phoneNumber: mentor.phoneNumber,
                },
                token: token
            });
        } else {
            res.status(400);
            throw new Error("Invalid Mentor Data");
        }
    }
});





//login user

const loginUser = asyncHandler(async (req, res) => {
    const { studentId, password } = req.body;

    const user = await User.findOne({ studentId });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({message:"Login successful", user: { id: user._id, name: user.name, email: user.email, studentId: user.studentId } });
    } else {
        res.status(400);
        throw new Error("invalid Credentials");
    }
})




//Forgot Password

const forgotPassword = asyncHandler(async (req, res) => {
  try {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const otp = generateOTP();
  user.otp = otp;
  await user.save();

  await transporter.sendMail({
    from: "aarijfarhan74@gmail.com",
    to: email,
    subject: 'OTP has been sent',
    text: `Your OTP is ${otp}`
  });
  
  res.json({ message: 'OTP sent to your email.' });


}catch (error) {
  console.error('Error sending OTP:', error);
  res.status(500).json({ message: 'Error sending OTP.' });

}});


//Verify OTP and update password

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp, newpassword } = req.body;  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // if (user.otp !== String(otp)) {
    //   return res.status(400).json({ message: 'Invalid OTP.' });
    // }
    // console.log(user.otp, otp)

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    await user.save();
    res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP.' });
  }
});




//Logout User

  const LogoutUser= asyncHandler( async(req,res)=>{

  res.cookie('token','',{
    httpOnly:true,
    sameSite:'strict',
    expires:new Date()
  })
  res.status(200).json({message:"Logged out succesfully" , user})
})



module.exports = { loginUser, registerUser , registerMentor, forgotPassword , verifyOtp , LogoutUser} 