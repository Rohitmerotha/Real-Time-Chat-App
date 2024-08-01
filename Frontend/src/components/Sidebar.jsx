import React, { useState } from 'react'
import '../index.css';
import {BiSearchAlt2} from "react-icons/bi";
import OtherUsers from './OtherUsers';
import { RiLogoutBoxLine } from "react-icons/ri";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';


const Sidebar = () => {
    const [search,setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOutHandler = async()=>{
        
        try{
            const res = await axios.get('http://localhost:8080/api/v1/user/logout');
            navigate("/login")
            toast.success(res.data.message)
            dispatch(setAuthUser(null));
        }catch(error){
            console.log(error);
        }

    }
    const onSubmitHandlr = (e)=>{
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=>user?.fullName.toLowerCase()?.includes(search.toLowerCase()));
        if(conversationUser){
           dispatch(setOtherUsers([conversationUser]));
        }else{
          toast.error("User Not Found");
        }
        // alert(search);
    }

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
    <form onSubmit={onSubmitHandlr} className=' flex items-center gap-2'>
    <input
        type='text'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder='Search...'
        className='input input-bordered rounded-md'
    />
    <button type='submit' className='btn bg-zinc-500 text-white'>
        <BiSearchAlt2 className='w-6 h-6 outline-none'/>
    </button>
    </form>
    <div className="divider px-3"></div>

    <OtherUsers/>
     <div className='bg-gray-600 p-2 bottom-1 -mb-2  text-white text-2xl rounded-md'>
        <button onClick={logOutHandler}>
        <RiLogoutBoxLine />
        </button>
     </div>

    </div>
  )
}

export default Sidebar