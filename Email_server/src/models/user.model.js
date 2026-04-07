
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:[true,"userName already Exist"],
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already Exist"],
        index:true
    },
    password:{
        type:String,
        required:true   
    },
     isVerified: {
      type: Boolean,
      default: false,
    }
},{timestamps:true })



const User = mongoose.model("User",userSchema)

export default User