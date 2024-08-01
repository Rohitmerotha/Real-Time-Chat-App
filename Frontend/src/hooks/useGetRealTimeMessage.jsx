import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";


const useGetRealTimeMessage = () => {
    const {socket} = useSelector(store=>store.socket);
    const {messages} = useSelector(store=>store.message);
    const dispatch = useDispatch();
    useEffect(()=>{
        // console.log("err1")
      socket?.on("newMessage",(newMessage)=>{
        // console.log("err2")
          dispatch(setMessages([...messages,newMessage]));
      })
      return ()=>socket?.off("newMessage");
    },[setMessages,messages])
 
}

export default useGetRealTimeMessage;