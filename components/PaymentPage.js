"use client"
import React from 'react'
import Script from 'next/script'
import {initiate,  fetchpayments , fetchuser } from '@/actions/useractions'  // importing server component in our client side initiate 

import { useState , useEffect} from 'react'
import { useSession } from 'next-auth/react'



const PaymentPage = ({username}) => {
  const [paymentform, setpaymentform] = useState({name:"" , message:"" ,amount:""}) 
  const [currentuser, setcurrentuser] = useState({})
  const [payments, setpayments] = useState([])
 
  
  useEffect(() => {
    getData()

  }, [])

 
  
  

  const {data: session} = useSession()
  const handlechange = (e) =>{  
   setpaymentform( {...paymentform , [e.target.name]: e.target.value})
   console.log(paymentform)
  }
  const getData = async (params) =>{
    let u = fetchuser(username)
    setcurrentuser(u)
    let dbpayments = await fetchpayments(username)
    setpayments(dbpayments)
  
}


    const pay = async (amount)=>{
      // Get the order id 
      let a =  await initiate(amount, username , paymentform) // user_to as username here 
      let orderID = a.id 
      // taken from docs of razorpay integration 
        var options = {
         "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard 
    "amount": amount, // Amount is in currency subunits. 
    "currency": "INR",
    "name": "Chai-Otic", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": orderID, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": session?.user?.name || "", //your customer's name
        "email": session?.user?.email || "",      
        
        "contact": "9205542479" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
      }
      
    return (

        <>
        
{/* we can't use import razorpay method in client because in that way it will be in server page 
so in client page we import it using Script */}
<Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

   <div  className='cover w-full bg-red-50 relative'>
     
          <img className='object-cover w-full h-[350px]  'src= "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/1180182/4f15af89878e46ad8697936c5b65e637/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/3.png?token-hash=AK34Jc221ZWl2iMmLwmmdfRvNjqoqwol77A7BvTdIik%3D&token-time=1754265600" alt="" />

          <div className='absolute -bottom-14  right-[47%] border-white border-2 rounded-full p-2'>
            <img width={88} height={88} className='rounded-full p-1' src="https://cdn.pixabay.com/photo/2024/01/25/06/56/gaming-logo-8531082_1280.png"alt="" />
            

          </div>
        </div>

        <div className="info flex flex-col justify-center items-center my-14 gap-1 ">
          <div className='font-bold'>
          @{username}

          </div>
          <div className='text-slate-400'>
            lets help {username} get a chai!
             </div>
            <div className='text-slate-400'>
           {payments.length} posts .{username} has raised  ₹{payments.reduce((a,b) => a+b.amount,0)}
            
          </div>

          <div className="payment flex gap-4  mt-11 flex-col w-[80%] md:flex-row md:gap-3 ">
            <div className="supporter w-full bg-slate-900 rounded-lg p-10 text-white md:w-1/2">
           {/* show list of all the supporters as a leaderboard  */}
           <h2 className='font-bold text-2xl my-5 '> Your Chai!</h2>
           <ul className='mx-4 text-lg'>
            {payments.length == 0 && <li>No payments yet</li>}
            {payments.map((p,i) =>{
            return <li key={i} className='my-4 flex gap-2 items-center'> <img className='rounded-full p-1'src="/pro.gif" width={42} height={42} alt="" /> <span>{p.name}<span className='font-bold text-green-500'>₹{Number.parseInt(p.amount)/100}</span> with a message {p.message} </span>
            </li>})}
           
           
           </ul>
            </div>
            <div className="makepayment w-full bg-slate-900 rounded-lg p-10 text-white md:w-1/2">
            <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>

            <div className='flex gap-2 flex-col'>
            
              <input onChange={handlechange} value={paymentform.name} name='name'type="text" className='w-full p-3 rounded-lg bg-slate-800'  placeholder='Enter Name '/>
              <input onChange={handlechange} value={paymentform.message} name='message'type="text" className='w-full p-3 rounded-lg bg-slate-800'  placeholder='Enter Message '/>
              <input onChange={handlechange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800'  placeholder='Enter amount '/>
             <button disabled={paymentform.name?.length<2 ||paymentform.message?.length<2 || paymentform.amount?.length<1} onClick={()=>pay(Number.parseInt(paymentform.amount)*100)} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600  disabled:from-purple-100">Pay</button>
              </div>

              

            {/* or choose below amount  */}
            <div className='flex gap-2 mt-5'>
              <button  type='button' className='bg-slate-600 p-3 rounded-lg ' onClick={()=> pay(200)}> pay ₹2</button>
              <button  type='button' className='bg-slate-600 p-3 rounded-lg ' onClick={()=>pay(800)}> pay ₹8</button>
              <button  type='button' className='bg-slate-600 p-3 rounded-lg ' onClick={()=> pay(1000)}> pay ₹10</button>

            </div>


            </div>
          </div>
        </div>
        
</>

  
 )
}
export default PaymentPage
