//[username] is a dynamic route 

import React from 'react'
import Image from 'next/image'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation'
import connectDb from '@/db/connectDB'
import User from '@/models/User'
const username = async  ({params}) => {
  // if the username is not present in the database , show 404 page
 const checkUser = async ()=>{
  await connectDb()
  let u = await User.findOne({username: params.username})
  if(!u){
    return notFound()
  }

 }
 await checkUser()

  
  return (
    <>
     <PaymentPage username={params.username}/>
    </>
      
  
  )

}

export default username

// it is a dynamic route so dynamic metadata 
export async function generateMetadata({params}) {
  return {
  title: `support ${params.username}-Chai-Otic`
  }
  
}

