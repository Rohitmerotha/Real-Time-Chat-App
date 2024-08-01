import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({user}) => {
  const dispatch = useDispatch();
  const {selectedUser,onlineUsers} = useSelector(store=>store.user);
  // console.log("onlineUsers",onlineUsers)
  const isOnline = onlineUsers?.includes(user._id);
  const selectedUserHandler =(user)=>{
  //  console.log("User..",user);
  dispatch(setSelectedUser(user));
  }
  console.log("url",process.env.BASE_URL)

return (
<>
<div onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? "bg-zinc-200 text-zinc-900":""} flex font-semibold items-center gap-2 text-white hover:text-zinc-900 hover:bg-zinc-200 rounded-md cursor-pointer`}>
    <div>
        <div 
        className={`avatar ${isOnline ? 'online':''} `}
        >
        <div className="w-12 rounded-full">
        <img src={user?.profilePhoto}  alt='avatar'/>
        </div>
        </div> 
    </div>
    <div>
        <div className="">
        <div className="">
         {user?.fullName}
        </div>
        </div> 
    </div>

</div>
 <div className="divider my-0 py-0 h-1"></div>
</>

 
  )
}

export default OtherUser