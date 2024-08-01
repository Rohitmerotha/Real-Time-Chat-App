
import { useEffect, useState  } from 'react';
import './App.css';
import HodmePage from './components/HodmePage';
import Login from './components/Login';
import Signup from './components/Signup';
import {createBrowserRouter, RouterProvider,Navigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
// const router = createBrowserRouter([
//   {
//   path:"/",
//   element:<HodmePage/>
// },
// {
//   path:"/signup",
//   element:<Signup/>
// },
// {
//   path:"/login",
//   element:<Login/>
// },
// ])

function App() {
const dispatch = useDispatch();
const {authUser} = useSelector(store=>store.user);
const {socket} = useSelector(store=>store.socket);

useEffect(()=>{
  if(authUser){
    const socketio = io('http://localhost:8080',{
          query:{
            userId:authUser._id
          }
    });
    dispatch(setSocket(socketio));
    console.log("error1")

    socketio?.on('getOnlineUser',(onlineUsers)=>{
      // console.log("onlineUsers,,,",onlineUsers);
      dispatch(setOnlineUsers(onlineUsers))
    });
    console.log("error2")
    return ()=>socketio.close();

  }else{
    if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  }
},[authUser]);

  return (
    <div className='p-4 h-screen flex justify-center items-center'>
      <RouterProvider router={
        createBrowserRouter([
  {
  path:"/",
  element:authUser ? <HodmePage/> : <Navigate to={"/login"}/>
},
{
  path:"/signup",
  element:authUser ? <Navigate to={"/"}/>:<Signup/>
},
{
  path:"/login",
  element:authUser ? <Navigate to={"/"}/>:<Login/>
},
])
      }/>
    </div>
  );
}

export default App;
