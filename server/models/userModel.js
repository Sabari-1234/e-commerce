const mongoose=require('mongoose')
const validator=require('validator')
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'please enter name']
        },
        email:{
            type:String,
            required:[true,'please enter email'],
            validate:[validator.isEmail,'please enter valid email']
        },
        password:{
            type:String,
            required:[true,'please enter password']
            
        },
        avatar:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:'user'
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }

    }
)
const User =mongoose.model('User',userSchema)
module.exports=User
