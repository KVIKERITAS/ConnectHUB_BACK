import express from "express";
import userController from "../controllers/user"
import middleware from "../middleware/validators"

const router = express.Router()

router.post("/register", middleware.validate, userController.registerUser)
router.post("/login", userController.loginUser)
router.post("/change/image", middleware.authorize, userController.changeImage)
router.post("/change/password", middleware.authorize, userController.changePassword)
router.get("/get", middleware.authorize, userController.getAllUsers)

export default router