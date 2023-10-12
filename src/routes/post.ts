import express from "express";
import postController from "../controllers/post"
import middleware from "../middleware/validators"

const router = express.Router()

router.post("/create", middleware.authorize, postController.createPost)
router.get("/get", middleware.authorize, postController.getAllPosts)

export default router