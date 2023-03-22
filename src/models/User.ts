import { Schema, model } from "mongoose";

const UserShema= new Schema({
    name: {type: String, required: true,  unique: true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    createAt: {type: Date, default: Date.now},
    updateAt: Date,
    posts:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

export default model ('User', UserShema);