import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from './routes/userRoute.js'
import authRoutes from './routes/auth.routes.js'

const app = express();

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;


app.use('/api/user', route)
app.use('/api/auth', authRoutes)


mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`Server is runing on port ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})