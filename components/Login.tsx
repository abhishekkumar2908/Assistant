'client side component'
import React from 'react'
import Image from 'next/image'

function Login() {
  return (
    <div className='flex flex-col h-screen items-center bg-[#4c4d49d8]'>
      <Image src="/logo.jpg" alt="Assistant" width={200} height={100}/>
      <button className="bglogin">Please Login to Assistant</button>
    </div>
  )
}

export default Login
