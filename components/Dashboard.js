"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { fetchuser, updateProfile } from '@/actions/useractions'

const Dashboard = () => {
    const { data: session, status, update } = useSession() 
    const router = useRouter()
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            router.push("/Login")
        }
        if (status === "authenticated" && session?.user?.name) {
            getData()
        }
    }, [status, router, session])

    const getData = async () => {
        try {
            let user = await fetchuser(session.user.name) 
            setForm(user)
        } catch (error) {
            console.error("Error fetching user:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        // CRITICAL FIX: Create a clean object with ONLY the fields allowed to update.
        // If we send 'form' directly, it includes '_id' which causes a Database Crash.
        let updateData = {
            name: form.name,
            username: form.username,
            profilepic: form.profilepic,
    
        }

        try {
            await updateProfile(updateData, session.user.username) 
             
            await update({
                ...session,
                user: {
                    ...session.user,
                    name: form.name 
                }
            })
            
            alert("Profile Updated Successfully!")
            router.refresh() 
        } catch (error) {
            alert("Update Failed")
            console.error(error)
        }
    }

    if (status === "loading" || loading) {
        return <div className="p-10 text-center">Loading Dashboard...</div>
    }

    return (
        <div className='container mx-auto p-8 md:p-0 md:py-5'>
            <h1 className='text-center font-bold text-2xl my-5'>Welcome to the dashboard</h1>
            
            <form className='max-w-2xl mx-auto' onSubmit={handleSubmit}> 
                
                {/* NAME */}
                <div className='my-2'>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input value={form.name || ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs" />
                </div>

                {/* EMAIL (Read-Only) */}
                <div className="my-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input value={form.email || ""} onChange={handleChange} type="email" name='email' id="email" readOnly className="block w-full p-2 text-gray-500 border border-gray-300 rounded-lg bg-gray-200 text-xs cursor-not-allowed" />
                </div>

                {/* USERNAME */}
                <div className='my-2'>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input value={form.username || ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs" />
                </div>

                {/* PROFILE PIC */}
                <div className="my-2">
                    <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture URL</label>
                    <input value={form.profilepic || ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs" />
                </div>

                

                <div className="my-6">
                    <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-medium text-sm">Save Profile</button>
                </div>
            </form>
        </div>
    )
}

export default Dashboard