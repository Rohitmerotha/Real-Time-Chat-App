import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const {selectedUser} = useSelector(store => store.user);
    const dispatch = useDispatch();
useEffect(()=>{
    const fetchMessages = async()=>{
     try{
        // console.log("selectedUser..",selectedUser)
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`);
        console.log("res..,.",res);

        dispatch(setMessages(res.data));


     }catch(error){
        console.log(error);
     }
    }

    fetchMessages();
},[selectedUser?.id,setMessages]);
}

export default useGetMessages