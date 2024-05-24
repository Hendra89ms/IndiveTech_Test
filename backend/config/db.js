import mongoose from "mongoose";
import env from 'dotenv'
env.config()

const ConnectDB = () => {
    console.log("Connecting to MongoDB...");
    mongoose.set('strictQuery', false)

    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log(
                "MongoDB connection established successfully"
            );
        })
        .catch(async (err) => {
            console.log(
                `Error connecting to MongoDB ${err.message}`
            );
        });
};

const CloseDB = () => {
    mongoose.connection.close();
}

export {
    ConnectDB,
    CloseDB,
};
