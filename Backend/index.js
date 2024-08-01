// const express = require("express")
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/database.js"
import userRouter from "./route/userRoute.js"
import messageRouter from "./route/messageRoute.js"
import cookieParser from "cookie-parser";
import {app,server} from "./socket/socket.js"
dotenv.config({});

// const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    origin:'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOption));

app.use("/api/v1/user",userRouter)
app.use("/api/v1/message",messageRouter)

server.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})