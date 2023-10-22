import {Request, Response} from "express";
import Chat from "../db/chat"

require("dotenv").config()


const getInbox = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const inbox = await Chat.find({participants: {$elemMatch: {_id: userId}}})

    res.status(200).json({inbox})

  } catch (error) {
    console.log(error);
    res.sendStatus(400)
  }
}
const sendMessage = async (req: Request, res: Response) => {
  try {
    const data = req.body

    if(data._id === "placeholder") {
      const chat = new Chat({
        participants: data.participants,
        chat: [data.chat]
      })
      await chat.save()
    }

    res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(400)
  }
}

export default {sendMessage, getInbox}