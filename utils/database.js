import mongoose from 'mongoose'

let isConnected = false //track connection

export async function connectToDB() {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB is connected!')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected!!')
    } catch (err) {
        console.log(err)
    }
} 