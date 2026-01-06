import {asyncHandler} from "../utils/asyncHandler.js";
import ApiError from "../utils/Apierror.js";
import {User} from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{
  // registration logic yaha likhenge
  //  res.status(201).json({message:"User registered successfully"});

  //get user details 
  //validate krna hai
  //check if user already exists: username or email
  //check for images and avtaar
  //upload to cloudinary
  //remove password from response
  //check for user creation success or failure
  //return res 


  // 1.
  const{fullname,username,email,password}=req.body;
  console.log(email);

  // 2.
    if(!fullname || !username || !email || !password){
        throw new ApiError(400,"All fields are required");
    }

    // 3.
    const existedUser= await User.findOne(
        {$or:[ { email } , { username} ] }
    );
    if(existedUser){
        throw new ApiError(400,"Username or email already exists");
    }

    // 4.
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path
 
    if(!avatarLocalPath){
        throw new ApiError (400,"Avatar image is required");
    }
    if(!coverImageLocalPath){
        throw new ApiError (400,"Cover image is required");
    }

    // 5.

    const avatar = await uploadCloudinary(avatarLocalPath);
    const coverImage = await uploadCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar image is required");
    }
    if(!coverImage){
        throw new ApiError(400,"Cover image is required");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.secure_url,
        coverImage: coverImage.secure_url,
        username:username.toLowerCase(),
        email,
        password,
    });

    // 6.
    
    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500,"User registration failed");
    }

    // 7. response bheja ki user create aur register hogya
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    );
});
export { registerUser}; 