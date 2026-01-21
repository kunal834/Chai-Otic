import mongoose from "mongoose";
const { Schema , model } = mongoose;
const UserSchema = new Schema({
    email: {type: String, required:true ,unique:true},
    name: {type:String ,default:'' },
    username: {type:String ,required:true, unique:true},
    profilepic: {type:String,default:''},
    coverpic: {type:String,default:'' },
    razorpayid: {type:String,default:''},
    razorpaysecret: {type:String ,default:''},
    createdAt: { type: Date , default: Date.now},
    updatedAt: { type: Date , default: Date.now },
    
} ,{ timestamps: true })


 const User = mongoose.models.User || model("User" , UserSchema)
 
export default User 