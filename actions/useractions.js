"use server"
import Razorpay from "razorpay"  // by npm i razorpay
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDB"
import User from "@/models/User"



export const initiate = async(amount , to_user, paymentform) =>{
    // connection to database 
    await connectDb()
    

    // get it from razorpay integration docs 
  var instance = new Razorpay({
     key_id:process.env.NEXT_PUBLIC_KEY_ID,
     key_secret: process.env.NEXT_PUBLIC_KEY_SECRET 
    })
    
let options = {
    amount: Number.parseInt(amount),
    currency: "INR"
}
//.create() — it is a method provided by the Razorpay SDK for Node.js.

let x = await instance.orders.create(options)   //orders is a property of the Razorpay instance that lets you access Razorpay's Orders API.
// create a payment object which shows a pending payment 
await Payment.create({orderID: x.id, 
    amount: amount, 
    to_user: to_user, 
    name:paymentform.name , 
    message: paymentform.message})

  
return x    
}


// for fetching user to detail to show who pays how much
export const fetchuser = async(username) => {
    await connectDb()
  
    let u = await User.findOne({username: username}) 
    //The .toObject() method in Mongoose converts a Mongoose document into a plain JavaScript object.
    let user = u.toObject({flattenObjectIds: true}) // converting mongoose data into a plain javascript object 
    return user 
    
    
}

// to fetch payment amount
export const fetchpayments = async(username) => {
    await connectDb()   

    // find all payments sorted by decreasing order of amount 
   let p = await Payment.find({to_user: username , done:true}).sort({amount: -1}).lean()  // decreasing order in amount 
    return p
}

export const updateProfile  = async(data,oldusername)=>{
    await connectDb()
    
    let  ndata = Object.fromEntries(data)  //Object.fromEntries() takes an iterable of key-value pairs (like an array or a FormData object) and turns it into a plain JavaScript object.
    // if the username is being updated , check if username is available 
    if(oldusername !== ndata.username){
        let u = await User.findOne({username: ndata.username})
    if(u){
        return {error: "username already exists"}
    }


}

    await User.updateOne({email: ndata.email}, ndata)
  
}
export default initiate


