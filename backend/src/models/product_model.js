import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const Product = mongoose.Schema({
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
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: ["meja", "kursi"],
    },
    condition: {
        type: ["bagus", "rusak", "perlu perbaikan", "dalam perbaikan"]
    }
})

const ProductModel = mongoose.model("Product", Product)

export default ProductModel;