import {Conversation} from "../models/conversationModel.js"
import {Message} from "../models/messageModel.js"
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";
export const sendMessage = async(req,res)=>{
    try{
      const senderId = req.id;
      const receiverId = req.params.id;
      const {message} = req.body;

      let gotConversation = await Conversation.findOne({
           participents:{$all:[senderId,receiverId]},
      })
      if(!gotConversation){
        gotConversation = await Conversation.create({
            participents:[senderId,receiverId]
        })
      };

      const newMessage = await Message.create({
        senderId,
        receiverId,
        message
      });
      if(newMessage){
        gotConversation.messages.push(newMessage._id)
      };
      // await gotConversation.save();
      await Promise.all([gotConversation.save(),newMessage.save()]);
    //  console.log("before socket")
      //SOCKET IO
      const receiverSocketId = getReceiverSocketId(receiverId);
      // console.log("receiverSocketId",receiverSocketId)
      if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
      }
      // console.log("after socket")




      return res.status(200).json({
        newMessage,
        message:"Message send successfuly"
      })

    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error in " });  
    }
}


export const getMessage = async (req,res)=>{
  try{
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
                        participents:{$all:[senderId,receiverId]}
    }).populate("messages");
    // console.log("conversation?.messages",conversation?.messages)

    return res.status(200).json(
      conversation?.messages)
    // console.log(conversation); 

  }
  catch(error){
    console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });  
  }
}