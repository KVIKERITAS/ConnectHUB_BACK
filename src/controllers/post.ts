import {Request, Response} from "express";
import Post from "../db/posts"
import { createPostSchema } from '../models/typesForm';

require("dotenv").config()

const createPost = async (req: Request, res: Response) => {
  try {
    const checkData = createPostSchema.safeParse(req.body)

    if (!checkData.success) return res.status(400).json({error: true, message: "Invalid data"})

    const {image, message, data} = req.body

    const post = new Post({
      image,
      message,
      userId: data.id,
      username: data.username,
      userImage: data.image
    })

    await post.save()

    res.status(200).json({error: false, message: "Post successfully created"})

  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()

    console.log(posts);

    res.status(200).json({posts})

  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export default {createPost, getAllPosts}