import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config({});

const isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.cookies.token 
        || req.body.token 
        || req.header("Authorization").replace("Bearer ", "");
     if(!token){
        return res.status(401).json({message:"user not authenticated"});
     }
     const decode =  jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!decode){
        return res.status(401).json({message:"invalid token"})
    }
    req.id = decode.userId;
    next();
    
    }
    catch(error){
console.log(error);
    }
}
export default isAuthenticated;