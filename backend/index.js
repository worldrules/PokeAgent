import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from './routes/userRoute.js'

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

const app = express();




app.use(bodyParser.json());
dotenv.config();

mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`Server is runing on port ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})

app.use('/api/user', route)

