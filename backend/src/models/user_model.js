import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const User = mongoose.Schema({
    uId: {
        type: String,
        default: uuidv4,
        required: true,
        unique: true
    },
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: true
    },
    isVerification: {
        type: Boolean,
        default: false
    }
})

const UserModel = mongoose.model("User", User)

export default UserModel;