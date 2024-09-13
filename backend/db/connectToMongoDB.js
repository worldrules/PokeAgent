import mongoose from 'mongoose'

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

export default connectToMongoDB