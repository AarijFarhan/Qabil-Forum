const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config()

const mentorSchema=mongoose.Schema({
    name: {
        type: String,
      },
    phoneNumber: {
        type: Number,
      },
    password: {
        type: String,
      },
    email: {
        type: String,
      }      
})

module.exports=mongoose.model('Mentor',mentorSchema)