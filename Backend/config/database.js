import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// console.log("PORT",process.env.MONGO_URL)
const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('Database connected');
    }).catch((error)=>{console.log("Error to connect")})
}
export default connectDB;
