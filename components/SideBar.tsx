"use client";
import React from 'react'
import NewChat from './NewChat'
import { useSession, signOut } from 'next-auth/react';

function SideBar() {
  const {data: session} = useSession();
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat/>
        
            <div>
                {/* ModelSelection */}
            </div>
            {/* Map through chat rows */}

        </div>
      </div>
      {session && <img 
      onClick={()=>signOut()}
      src={session.user?.image!}
      alt ="Profile pic"
      className='h-12 w-12 rounded-full mx-auto mb-2 hover:opacity-75 cursor-pointer'/>}
    </div>
  )
}

export default SideBar
