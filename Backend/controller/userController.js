import {User} from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);


		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = await User.create({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePhoto: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		// if (newUser) {
		// 	// Generate JWT token here
		// 	generateTokenAndSetCookie(newUser._id, res);
		// 	await newUser.save();

			res.status(201).json({
                success:true,
                message:"Signup successfuly",
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		// } else {
		// 	res.status(400).json({ error: "Invalid user data" });
		// }
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async(req,res) =>{
   try{
    const {username,password} = req.body;
    if(!username || !password){
    return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({ message: "First need to signup" });
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password);

    if(!isPasswordMatch){
        return res.status(400).json({ 
            success:false,
            message: "Incorrect username and password" });
    }
  
    const tokenData ={
        userId:user._id
    };
    const token = jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'})

    res.cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite: 'strict'}).status(200).json({
        success:true,
        _id:user._id,
        username:user.username,
        fullName:user.fullName,
        profilePhoto:user.profilePhoto,
        message:"login successfully"
    })


   }catch(error){
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
   }
};

export const logout =  (req,res)=>{
 try{
  return res.status(200).cookie("token","",{maxAge:0}).json({
    message:"Loged out successfuly"
  })
 }catch(error){
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });  
 }
};

export const getOtherUser = async(req,res)=>{
    try{
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json({
            otherUsers
        })

    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });  
    }
}