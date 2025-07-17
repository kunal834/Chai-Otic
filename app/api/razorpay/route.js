//this page is designed because if we pay the amount then it cant be redirect to our page after payment to redirect it we make it 

import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDB";
import NextAuth from "next-auth";


export const POST = async(req) =>{
      await connectDb()
      let body = await req.formData()// a object created 
      body = Object.fromEntries(body)


      //check if razorpayOrderId is present on the server 
      let p = await Payment.findOne({orderID: body.razorpay_order_id})

      if(!p){

         return NextResponse.json({success: false ,messge:"order Id not found"})
       
      }

      // verify the payment 
      //   from documentation for payment signature => validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
      let verify = validatePaymentVerification({"order_id":body.razorpay_order_id , "payment_id": body.razorpay_payment_id}, body.razorpay_signature  , process.env.NEXT_PUBLIC_KEY_SECRET)
      

      if(verify){
        //update the payment status 
        const updatedpayment = await Payment.findOneAndUpdate({orderID:body.razorpay_order_id } , {done: "true"} ,{done:true} ,{new:true}) // new: true  it will return the updated document 
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedpayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.error("payment verification failed")
    }






}