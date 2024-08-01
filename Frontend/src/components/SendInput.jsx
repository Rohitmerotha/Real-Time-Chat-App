import React, { useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
  const [message,setMessage] = useState("");
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message);
  

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser._id}`,{message},{
        headers:{
          'Content-Type':'application/json'
        },
          withCredentials:true
        } 
      )
      dispatch(setMessages([...messages,res?.data?.newMessage]));
      // console.log("response...",res);
      
    }catch(error){
      console.log(error);
    }
    setMessage("");
  }

  return (
    <form onSubmit={onSubmitHandler}  className='px-4 w-full my-3'>
    <div className='relative'>
       <input
        type='text'
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder='Type message...'
        className='border text-sm rounded-md block w-full p-3 bg-gray-600 text-white'
       />
       <div className=' absolute top-2 right-2 text-3xl'>
       <button type='submit'>
       <BsFillSendFill />
       </button>
       </div>
    </div>
    </form>
  )
}

export default SendInput