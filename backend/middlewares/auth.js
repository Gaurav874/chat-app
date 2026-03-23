// auth student teacher
const User = require("../model/Usermodel");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser")

const express = require("express")
const app = express()
app.use(express.json())
exports.auth = (req,res,next)=>{
    try{
        //fetching data
        const token = req.cookies.token
        if(!token){
            res.status(400).json({
                success:false,
                message:"token missing"
            })
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decode
        }
        catch{
            res.status(400).json({
                success:false,
                message:"token is incorrect"
            })
        }
        next();
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"failed authentication"
        })
    }
}

// exports.isStudent = async(req,res,next)=>{
//     try{
//         if(req.user.role != "student"){
//            res.status(400).json({
//             success:false,
//             message:"failed student portal access"
//         })
//         }
//         next();
//     }
//     catch(err){
//         res.status(400).json({
//             success:false,
//             message:"failed student portal access"
//         })
//     }
// }

// exports.isTeacher = async(req,res,next)=>{
//     try{
//         if(req.user.role != "teacher"){
//            res.status(400).json({
//             success:false,
//             message:"failed teacher portal access"
//         })
//         }
//         next();
//     }
//     catch(err){
//         res.status(400).json({
//             success:false,
//             message:"failed teacher portal access"
//         })
//     }
// }

exports.protectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ success: false, message: "Token missing" });
        }
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            const user = await User.findById(decode.id).select("-password")
            if(!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            req.user = user
        }
        catch{
            return res.status(401).json({ success: false, message: "Token invalid" });
        }
        next();
    }
    catch{
        return res.status(500).json({ success: false, message: "Route failed" });
    }
}