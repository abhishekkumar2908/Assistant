import { DocumentData } from 'firebase/firestore'
import { type } from 'os'
import React from 'react'

type Props ={
    message: DocumentData;
}

function Message({message}: Props) {
    const isChatGPT = message.user.name==="ChatGPT";
    return (
    <div className={`py-2 text-white ${isChatGPT && 'bg-[#585c6e]'}`}>    
        <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
            <img src={message.user.avatar} className='h-8 w-8 rounded-full'/>
            <p className='pt-1 text-sm'>{message.text}</p>
        </div>
    </div>    
  )
}

export default Message
