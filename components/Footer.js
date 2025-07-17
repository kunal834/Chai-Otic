import React from 'react'

const Footer = () => {
  const currentyear = new Date().getFullYear();
  return (
   <footer className='bg-gray-900 text-white  p-2 px-4 '>
   <p className='text-center'>  Copyright &copy; {currentyear} Chai-Otic -All Rights Reserved</p> 
   </footer>
  )
}

export default Footer
