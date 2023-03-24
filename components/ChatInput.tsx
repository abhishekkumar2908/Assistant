"use client";
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import {db} from '../firebase';


type Props={  
  chatid: string  
}

function ChatInput({chatid}:Props) {
  const [prompt, setPrompt] = useState("");
  const {data: session} = useSession();

  //TODO: use SWR to get model
  const model = "text-davinci-003";

  //chatGPT stuff
  const sendMessage = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    //firestore-message
    const message : Message={
      text: input,
      createdAt: serverTimestamp(),
      user:{
        _id : session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api?name=${session?.user?.name}`,
      }       
    }

//adding document to the database 
  await addDoc(
    collection(db,"users", session?.user?.email!, "chats", chatid, "messages"),
    message

  )  

  //Toast Notification to say loading
  const notification= toast.loading("umm!...");
  await fetch('api/askQuestion',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: input, chatid, model, session
    }),
  }).then(()=>{

    //Toast notification to say successful!
    toast.success("Assistant has responded!", {
      id: notification,
    });
  });
  }


  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm'>
      <form className='p-2 space-x-5 flex'
            onSubmit={sendMessage}>
        <input 
          className='bg-transparent focus:outline-none flex-1
          disabled:cursor-not-allowed disabled:text-gray-300 text-gray-100 font-semibold'
          disabled={!session}
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          type="text"
          placeholder='Type your message'
        />
        <button 
          disabled={!prompt || !session}
          type="submit"
          className='bg-[#11A37F] hover:opacity-50 text-white font-bold
            px-4 py-2 rounded'
        ><PaperAirplaneIcon className='h-4 w-4 -rotate-45'/>
        </button>
      </form>
    </div>
  )
}

export default ChatInput
