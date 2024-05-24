import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import env from 'dotenv'
import { ConnectDB } from '../config/db.js'
env.config()
import { errorHandler, notFound } from './middlewares/error_middleware.js'
import router from './routes/index.js'


const app = express()
const port = process.env.PORT

ConnectDB()

// MIDDLEWARE
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
    })
);

app.use(cors(corsOptions));
app.use("/", router);

app.listen(port, () => {
    console.log("PORT RUNNING ON " + port);
});

// HANDLE ERROR
app.use(notFound);
app.use(errorHandler);
