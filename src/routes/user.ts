import express from "express";
import userController from "../controllers/user"
import middleware from "../middleware/validators"

const router = express.Router()

router.post("/register", middleware.validate, userController.registerUser)
router.post("/login", userController.loginUser)

export default router