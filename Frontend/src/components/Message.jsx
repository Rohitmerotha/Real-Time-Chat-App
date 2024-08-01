import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

const Message = ({message}) => {
  // console.log("mess..",message)
  // console.log("message?.senderId ..",message?.senderId )

  

const scroll = useRef();

const {authUser,selectedUser} = useSelector(store=>store.user);
// console.log("authUser?._id..",authUser?._id)
useEffect(()=>{
  scroll.current?.scrollIntoView({behavior:"smooth"});
},[message])

  return (
<div ref ={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={` ${authUser?._id === message?.senderId ? authUser?.profilePhoto : selectedUser?.profilePhoto}`} />
    </div>
  </div>
  <div className="chat-header">
    <time className="text-xs opacity-50 text-white">12:45</time>
  </div>
  <div className={`chat-bubble ${authUser?._id === message?.senderId ? "":"bg-gray-200 text-zinc-950"}`}>{message?.message}</div>
</div>
  )
}

export default Message