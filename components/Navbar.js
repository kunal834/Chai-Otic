"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)
  console.log(session)
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // } 



  return (

    <nav className='bg-gray-900 shadow-lg text-white flex justify-between px-4 p-2 md:h-16 flex-col md:flex-row'>

      <div className="logo font-bold flex text-lg justify-center items-center gap-2">
        <img className="rounded-full" src="/tea.gif" alt="" width={60} height={60} />
        <Link href="/">Chai-Otic</Link></div>
      {/* <ul classNameName='flex justify-around gap-4'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign up</li>
                <li>Login</li>
            </ul> */}

      <div className='relative flex flex-col gap-4 md:block'>
        {/* dropdown */}
        {session && <>
          <button onClick={() => setshowdropdown(!showdropdown)} onBlur={() => setTimeout(() => {
            setshowdropdown(false)
          }, 100)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 md:mt-2" type="button"> welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {/* <!-- Dropdown menu --> */}
          <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[125px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/Profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
              </li>
              {/* <li>
        <a href="#" classNamw="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li> */}
              <li>
                <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home page</Link>
              </li>
              <li>
                <Link href={`${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your page</Link>
              </li>
              <li>

                <Link onClick={() => {
                  const confirmed = confirm("are you really want to logout")
                  if (confirmed) {
                    signOut()
                  }
                }} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div>
        </>}

        {/* if session  not present means not logged in  then show this button  */}
        {session &&
          <Link href={"/Login"}>
            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
            w-full md:w-fit" onClick={() => {
              const confirmed = confirm("are you really want to logout")
              if (confirmed) {
                signOut()
              }
            }}> Logout</button>
          </Link>}  



        {/* if session  not present means not logged in  then show this button  */}
        {!session &&
          <Link href={"/Login"}>
            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "> Login  </button>
          </Link>}
      </div>

    </nav>

  )
}

export default Navbar

