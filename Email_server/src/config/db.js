
import mongoose from "mongoose";

async function connectDB (){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Data Base connect successfully....")
    } catch (error) {
        console.log("error occure to setup the connect with mongoDB")
    }
}

export default connectDB