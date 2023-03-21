"use client";
import React from 'react'
import NewChat from './NewChat'
import { useSession, signOut } from 'next-auth/react';
import {useCollection} from "react-firebase-hooks/firestore"
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';





function SideBar() {
  const {data: session} = useSession();
  const [chats, loading, error] = useCollection(
    session && 
      query(
          collection(db,"users", session?.user?.email!, "chats"),
          orderBy("createdAt", "asc")
  ));
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat/>
        
            <div>
                {/* ModelSelection */}
            </div>
            {/* Map through chat rows */}
            {chats?.docs.map(chat=>(
              <ChatRow key={chat.id} id={chat.id}/>
            ))}

        </div>
      </div>
      {session && <img 
      title='Sign out'
      onClick={()=>signOut()}
      src={session.user?.image!} // image! '!' mark says that image will be there.
      alt ="Profile pic"
      className='h-12 w-12 rounded-full mx-auto mb-2 hover:opacity-75 cursor-pointer'/>}
    </div>
  )
}


export default SideBar
