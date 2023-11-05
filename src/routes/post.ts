import express from "express";
import postController from "../controllers/post"
import middleware from "../middleware/validators"

const router = express.Router()

router.post("/create", middleware.authorize, postController.createPost)
router.get("/get", middleware.authorize, postController.getAllPosts)
router.get("/get/:id", middleware.authorize, postController.getSinglePost)
router.get("/like/:post_id", middleware.authorize, postController.handlePostLike)
router.post("/comment/:post_id", middleware.authorize, postController.handleComment)

export default router