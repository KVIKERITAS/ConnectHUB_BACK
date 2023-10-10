import {Schema} from "mongoose"
import mongoose from "mongoose";

const UserSchema: Schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, required: false, default: "https://s16286.pcdn.co/wp-content/themes/pro-child/img/DTWS.Speaker.Headshot.placeholder.blue.png"}
})

export default mongoose.model("User", UserSchema)

