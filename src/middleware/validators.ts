import {Request, Response, NextFunction} from "express";
import User from "../db/users"

const validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password, confirmPassword} = req.body

        if (password !== confirmPassword) return res.sendStatus(400)

        const foundUser = await User.findOne({username})

        if (foundUser) return res.sendStatus(400)

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