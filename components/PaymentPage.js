"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation' // FIX 1: Correct Router Import
// FIX 2: Added 'validatePayment' to imports
import { initiate, fetchpayments, fetchuser, validatePayment } from '@/actions/useractions' 

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentuser, setcurrentuser] = useState({})
    const [payments, setpayments] = useState([])
    const router = useRouter() // FIX 3: Initialize Router
    const { data: session } = useSession()

    useEffect(() => {
        getData()
    }, [])

    const handlechange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentuser(u)
        let dbpayments = await fetchpayments(username)
        setpayments(dbpayments)
    }

    const pay = async (amount) => {
        // 1. Initiate the payment
        let a = await initiate(amount, username, paymentform)
        let orderID = a.id

        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID,
            "amount": amount,
            "currency": "INR",
            "name": "Chai-Otic",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderID,
            "handler": async function (response) {
                const result = await validatePayment(
                    response.razorpay_payment_id,
                    response.razorpay_order_id,
                    response.razorpay_signature
                )

                if (result.success) {
                    alert("Payment Successful!")
                    setpaymentform({ name: "", message: "", amount: "" })
                    getData()
                    router.refresh() // Now this works because we defined 'router'
                } else {
                    alert("Payment Verification Failed")
                }
            },
            "prefill": {
                "name": session?.user?.name || "",
                "email": session?.user?.email || "",
                "contact": "9205542479"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative'>
                <img className='object-cover w-full h-[350px]' 
                    src={currentuser.coverpic || "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/1180182/4f15af89878e46ad8697936c5b65e637/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/3.png?token-hash=AK34Jc221ZWl2iMmLwmmdfRvNjqoqwol77A7BvTdIik%3D&token-time=1754265600"} 
                    alt="cover" 
                />
                <div className='absolute -bottom-14 right-[47%] border-white border-2 rounded-full p-2'>
                    <img width={88} height={88} className='rounded-full p-1' 
                        src={currentuser.profilepic || "https://cdn.pixabay.com/photo/2024/01/25/06/56/gaming-logo-8531082_1280.png"} 
                        alt="profile" 
                    />
                </div>
            </div>

            <div className="info flex flex-col justify-center items-center my-14 gap-1">
                <div className='font-bold'>@{username}</div>
                <div className='text-slate-400'>lets help {username} get a chai!</div>
                <div className='text-slate-400'>
                    {payments.length} posts. {username} has raised ₹{payments.reduce((a, b) => a + b.amount, 0)}
                </div>

                <div className="payment flex gap-4 mt-11 flex-col w-[80%] md:flex-row md:gap-3">
                    <div className="supporter w-full bg-slate-900 rounded-lg p-10 text-white md:w-1/2">
                        <h2 className='font-bold text-2xl my-5'>Your Chai!</h2>
                        <ul className='mx-4 text-lg'>
                            {payments.length === 0 && <li>No payments yet</li>}
                            {payments.map((p, i) => (
                                <li key={i} className='my-4 flex gap-2 items-center'>
                                    <img className='rounded-full p-1' src="/pro.gif" width={42} height={42} alt="" />
                                    <span>
                                        {p.name} <span className='font-bold text-green-500'>₹{p.amount}</span> with a message {p.message}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="makepayment w-full bg-slate-900 rounded-lg p-10 text-white md:w-1/2">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col'>
                            <input onChange={handlechange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            <input onChange={handlechange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input onChange={handlechange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter amount' />
                            
                            {/* FIX 4: Removed '*100' here. Also fixed 'class' to 'className' */}
                            <button 
                                onClick={() => pay(Number.parseInt(paymentform.amount))} 
                                disabled={paymentform.name?.length < 2 || paymentform.message?.length < 2 || paymentform.amount?.length < 1}
                                type="button" 
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100"
                            >
                                Pay
                            </button>
                        </div>

                        <div className='flex gap-2 mt-5'>
                            <button type='button' className='bg-slate-600 p-3 rounded-lg' onClick={() => pay(10)}>pay ₹10</button>
                            <button type='button' className='bg-slate-600 p-3 rounded-lg' onClick={() => pay(20)}>pay ₹20</button>
                            <button type='button' className='bg-slate-600 p-3 rounded-lg' onClick={() => pay(30)}>pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentPage