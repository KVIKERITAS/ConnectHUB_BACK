import {Schema} from "mongoose"
import mongoose from "mongoose";

const ChatSchema: Schema = new Schema({
  participants: {type: Array, required: true},
  chat: {type: Array, required: true}
})

export default mongoose.model("Chat", ChatSchema)