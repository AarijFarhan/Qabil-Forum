const { loginUser,registerUser , registerMentor} =require('../controllers/userController')

const express=require('express')
const router=express.Router()

router.post('/login',loginUser)

router.post('/register',registerUser)

router.post('/register/mentor',registerMentor)

module.exports=router;