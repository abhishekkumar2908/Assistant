"use client";
import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

function Login() {
  
  
  
  return (
    <div className='flex flex-col h-screen items-center bg-[#4c4d49d8] '>
      <Image src="/logo.jpg" alt="Assistant" width={200} height={100} className='mt-10'/>
      <button className="bglogin text-3xl animate-pulse py-4"
            onClick={()=>signIn('google')
                }>Please Login to Assistant</button>
    </div>

  )
}

export default Login
