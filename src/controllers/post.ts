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
      userImage: data.image,
      createdAt: Date.now()
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
    let posts = await Post.find()
    posts = posts.reverse();

    res.status(200).json({posts})

  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

const handlePostLike = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params
    const { data } = req.body

    const post = await Post.findOne({_id: post_id})
    const isLiked = post.likes.find((like:string) => like === data.id)

    if (!isLiked) {
      await Post.findOneAndUpdate({_id: post_id}, {$push: {likes: data.id}})
      return res.status(200).json({error: false, message: "Post liked"})
    } else {
      await Post.findOneAndUpdate({_id: post_id}, {$pull: {likes: data.id}})
      return res.status(200).json({error: false, message: "Post disliked"})
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400)
  }
}

const handleComment = async (req: Request, res: Response) => {
  try {
    const { comment, data } = req.body
    const { post_id } = req.params

    await Post.findOneAndUpdate({_id: post_id}, {$push: {comments: {username: data.username, comment: comment}}})

    res.status(200).json({error: false, message: "Comment added"})

  } catch (error) {
    console.log(error);
    res.sendStatus(400)
  }
}

export default {createPost, getAllPosts, handlePostLike, handleComment}