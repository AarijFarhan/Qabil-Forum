const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const generateToken = require("../utils/generateToken");
const userModel = require("../models/userModel");
const cookieParser = require("cookie-parser");
const User = require('../models/userModel');
const Mentor = require('../models/mentorModel');




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





//Login User

// const loginUser = asyncHandler(async (req, res) => {
//     const { studentId, password } = req.body;

//     const user = userModel.findOne({ studentId });

//     if (user) {

//         const token = generateToken(user._id)
//         res.cookie('token', token, {
//             httpOnly: true,
//             sameSite: 'strict',
//             maxAge: 30 * 24 * 60 * 60 * 1000,
//         })
//         res.json({
//             studentId
//         });
//     } else {
//         res.status(400);
//         throw new Error("invalid Credentials");
//     }
// });


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
        res.json({
            studentId
        });
    } else {
        res.status(400);
        throw new Error("invalid Credentials");
    }
})




//Logout User

//   const LogoutUser= asyncHandler( async(req,res)=>{
//   res.cookie('token','',{
//     httpOnly:true,
//     sameSite:'strict',
//     expires:new Date()
//   })
//   res.status(200).json({message:"Logged out succesfully"})
// })



module.exports = { loginUser, registerUser , registerMentor}