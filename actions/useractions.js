"use server"
import Razorpay from "razorpay"  // by npm i razorpay
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDB"
import User from "@/models/User"



export const initiate = async (amount, to_user, paymentform) => {
    await connectDb()
    
    // FIX 1: Use the secure variable name (KEY_SECRET)
    var instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_KEY_ID, // Public ID is fine here
        key_secret: process.env.KEY_SECRET        // Must use the PRIVATE secret
    })

    // FIX 2: Razorpay takes amount in Paise (1 Rupee = 100 Paise)
    // We explicitly convert to integer to avoid decimal errors
    let amountInPaise = Number.parseInt(amount) * 100 

    let options = {
        amount: amountInPaise, 
        currency: "INR"
    }

    let x = await instance.orders.create(options) 
    
    // Create the pending payment in DB
    await Payment.create({
        orderID: x.id, 
        amount: amount, // Store the RUPEE value in your DB for readability
        to_user: to_user, 
        name: paymentform.name, 
        message: paymentform.message
    })

    return x    
}

//for fetching user to detail to show who pays how much
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

export const updateProfile = async (data, oldusername) => {
    await connectDb()
     
    // CHANGE: 'data' is already a plain object now. We don't need to convert it.
    let ndata = data; 
    
    console.log("Updated User:", ndata) // Good for debugging
    console.log("data" , data)

    // 1. Check if username is being changed (and if the new one is taken)
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
    }

    // 2. Update the user in the database
    // We search by 'oldusername' because that is the one currently in the session
    await User.updateOne({ username: oldusername }, { $set: ndata })

    return { success: true }
}




