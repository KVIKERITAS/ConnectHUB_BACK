import express from "express";
import chatController from "../controllers/chat"
import middleware from "../middleware/validators"

const router = express.Router()

router.get("/get/inbox/:userId", middleware.authorize, chatController.getInbox)
router.get("/get/single/:chatId", middleware.authorize, chatController.getSingleChat)
router.post("/send/message", middleware.authorize, chatController.sendMessage)

export default router