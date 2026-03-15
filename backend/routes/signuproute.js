const express = require("express")
const router = express.Router()

const {signup, signin, logout, updateprofile,check} = require("../controllers/signupcontroller")
// const {auth,isStudent,isTeacher} = require("../middlewares/auth")
const {protectRoute} = require("../middlewares/auth")

router.post("/signup",signup)
router.post("/signin",signin)
router.post("/logout",logout)
router.put("/updateprofile",protectRoute,updateprofile)
router.get("/check",protectRoute,check)
// router.get("/student",auth,isStudent,(req,res)=>{
//     res.json({
//         success:true,
//         message:"welcome to student portal"
//     })
// })

// router.get("/teacher",auth,isTeacher,(req,res)=>{
//     res.json({
//         success:true,
//         message:"welcome to teacher portal"
//     })
// })


module.exports = router
