const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
   userType: { type: String, enum: ['admin', 'student', 'professional'], default: 'student' }
})

const User=mongoose.model('User',userSchema)
module.exports=User