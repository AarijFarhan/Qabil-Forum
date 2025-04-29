const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config()

const userSchema=mongoose.Schema({
    name: {
        type: String,
      },
    studentId: {
        type: Number,
      },
    otp: {
        type: Number,
      },
    password: {
        type: String,
      },
    confirmpassword: {
        type: String,
      },
    newpassword: {
        type: String,
      },
    email: {
        type: String,
      }      
})

module.exports=mongoose.model('User',userSchema)