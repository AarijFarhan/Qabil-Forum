const { loginUser,registerUser , registerMentor , forgotPassword , verifyOtp, LogoutUser} =require('../controllers/userController')

const express=require('express')
const router=express.Router()



router.post('/login',loginUser)

router.post('/register',registerUser)

router.post('/forgot-password',forgotPassword)

router.post('/verify-otp',verifyOtp)

router.post('/register/mentor',registerMentor)

router.post('/logout',LogoutUser)

module.exports=router;