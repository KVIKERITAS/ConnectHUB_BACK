import {Schema} from "mongoose"
import mongoose from "mongoose";

const PostSchema: Schema = new Schema({
  image: {type: String, required: true},
  message: {type: String, required: true},
  userId: {type: String, required: true},
  username: {type: String, required: true},
  userImage: {type: String, required: true},
  comments: {type: [], required: false},
  likes: {type: [], required: false}
})

export default mongoose.model("Post", PostSchema)