const express = require("express")
const { protectRoute } = require("../middlewares/auth")
const router = express.Router()
const {getUsersForSidebar,getMessages,send} = require("../controllers/messagecontroller")

router.get("/users",protectRoute,getUsersForSidebar)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,send)

module.exports = router