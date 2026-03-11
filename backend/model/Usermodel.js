const mongoose = require("mongoose")

const Usermodel = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        profilepic:{
            type:String,
            default:""
        }
    },{
        timestamps:true
    }
)

module.exports = mongoose.model("signup", Usermodel)