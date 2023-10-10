import express from "express";
import controller from "../controllers/user"
import middleware from "../middleware/validators"

const router = express.Router()

router.post("/register", middleware.validate, controller.registerUser)
router.post("/login", controller.loginUser)

export default router