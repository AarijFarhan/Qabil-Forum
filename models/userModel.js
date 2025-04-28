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
    password: {
        type: String,
      },
    email: {
        type: String,
      }      
})

module.exports=mongoose.model('User',userSchema)