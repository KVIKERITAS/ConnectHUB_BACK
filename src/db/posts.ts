import {Schema} from "mongoose"
import mongoose from "mongoose";

const PostSchema: Schema = new Schema({
  image: {type: String, required: true},
  message: {type: String, required: true},
  userId: {type: String, required: true},
  username: {type: String, required: true},
  userImage: {type: String, required: true},
  comments: {type: Array, required: false},
  likes: {type: Array, required: false},
  createdAt: {type: Date, required: true}
})

export default mongoose.model("Post", PostSchema)