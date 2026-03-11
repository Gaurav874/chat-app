const mongoose = require("mongoose")

const Messagemodel = new mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Usermodel",
            required:true
        },
        receiverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Usermodel",
            required:true
        },
        text:{
            type:String
        },
        image:{
            type:String
        }
    },{timestamps:true}
)

module.exports = mongoose.model("Message",Messagemodel)