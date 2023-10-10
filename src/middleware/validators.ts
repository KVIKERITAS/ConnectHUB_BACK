import {Request, Response, NextFunction} from "express";
import User from "../db/users"
import {registerSchema} from "../models/typesForm";


const validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = registerSchema.safeParse(req.body)

        if (!data.success) return res.status(400).json({error: true, message: "Invalid data"})

        const {username, password, confirmPassword} = req.body

        if (password !== confirmPassword) return res.sendStatus(400).json

        const foundUser = await User.findOne({username})

        if (foundUser) return res.status(400).json({error: true, message: "Username already exists"})

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
    next()
}

const authorize = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export default {validate}