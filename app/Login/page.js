"use client"
import React from 'react'
import { useSession, signIn , signOut} from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Login = () => {
    const { data: session } = useSession()
 
    // document.title = "Login-Chai-Otic"
    const router = useRouter()
         // redirecting by using next navigation hooks 
   useEffect(() => {
    if(session) {
             router.push('/Profile')
            } 
   
     
   }, [session , router])
   
        
  return (
    <div className='text-white py-14 container  mx-auto '>
       <h1 className='font-bold text-center text-3xl'> Login to Get started</h1>


       <div className='flex flex-col gap-2 min-h-screen p-10 '>
        <div className=' flex justify-center '>
            <button className='bg-white text-black p-2 px-10 flex gap-2 justify-center rounded-2xl '> <img src="/gog.gif" alt="" width={44} height={44}/>continue with google </button>   

        </div>
        <div className=' flex justify-center '>
            <button className='bg-white text-black p-2 px-10 flex gap-2 justify-center rounded-2xl '> <img src="/in.png" alt="" width={24} height={24}/>continue with linkedin </button>   

        </div>
        <div className=' flex justify-center '>
            <button className='bg-white text-black p-2 px-10 flex gap-2 justify-center rounded-2xl '> <img src="/twit.gif" alt="" width={34} height={34}/>continue with Twitter </button>   

        </div>
        <div className=' flex justify-center '>
            <button className='bg-white text-black p-2 px-10 flex gap-2 justify-center rounded-2xl '> <img className="rounded-full" src="/face.png " alt="" width={34} height={34} />continue with Facebook</button>   

        </div>
        <div className=' flex justify-center '>
            <button onClick={ () => signIn("github")} className='bg-white text-black p-2 px-10 flex gap-2 justify-center rounded-2xl '> <img className="rounded-full"src="/git.gif" alt="" width={34} height={34} />continue with Github</button>   

        </div>
       
        <div className=' flex justify-center '>
            <button className='bg-white text-black p-2 px-10 flex gap-2 justify-center rounded-2xl '> <img src="/apple.gif" alt="" width={34} height={34} />continue with apple</button>   

        </div>

       </div>
      
    </div>
  )
}

export default Login
