import {Request, Response} from "express";
import User from "../db/users"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
require("dotenv").config()

const registerUser = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body

        const hash = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            password: hash
        })

        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const loginUser = async (req: Request, res: Response) => {
    try{
        const {username, password} = req.body

        const foundUser = await User.findOne({username})

        if(!foundUser) return res.sendStatus(400)

        const passwordMatch = await bcrypt.compare(password, foundUser.password)

        if(!passwordMatch) return res.sendStatus(403)

        const user = {
            username: foundUser.username,
            image: foundUser.image,
            id: foundUser._id
        }

        const token = jwt.sign(user, process.env.JWT_SECRET)

        res.status(200).json({
            ...user,
            token
        })

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export default {registerUser, loginUser}