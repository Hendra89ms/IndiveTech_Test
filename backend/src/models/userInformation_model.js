import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const UserInformation = mongoose.Schema({
    uId: {
        type: String,
        default: uuidv4,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true
    },
    tglLahir: {
        type: Date,
        required: true
    },
    noTelp: {
        type: Number,
        required: true
    },

    alamat: {
        type: String,
        required: true
    },

    job: {
        type: String,
    }

})

const UserinformationModel = mongoose.model("UserInformation", UserInformation)

export default UserinformationModel;