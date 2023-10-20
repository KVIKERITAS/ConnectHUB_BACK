import express from "express";
import chatController from "../controllers/chat"
import middleware from "../middleware/validators"

const router = express.Router()

router.get("/get/all/:userId", middleware.authorize)
router.post("send/message/:roomId", middleware.authorize)

export default router