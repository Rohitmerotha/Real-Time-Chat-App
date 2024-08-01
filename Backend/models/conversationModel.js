import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    participents :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    }]
 
}
,{timestamps:true});

export const Conversation = mongoose.model("Conversation",conversationSchema);