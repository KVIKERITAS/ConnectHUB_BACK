import {Request, Response, NextFunction} from "express";
import User from "../db/users"
import {registerSchema} from "../models/typesForm";
import jwt from 'jsonwebtoken';
require("dotenv").config()


const validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = registerSchema.safeParse(req.body)

        if (!data.success) return res.status(400).json({error: true, message: "Invalid data"})

        const {username, password, confirmPassword} = req.body

        if (password !== confirmPassword) return res.status(400).json({error: true, message: "Passwords do not match"})

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
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data) => {
            if (err) return res.status(400).json({error: true, message: "Invalid token"})
            req.body = { ...req.body, data }
        })

        next()

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export default {validate, authorize}