 import { asyncHandler  }  from "../utils/asyncHandler.js";
 import {ApiError} from "../utils/ApiError.js"
 import {User} from "../models/user.models.js"
 import {uploadOnCloudinary} from "../utils/cloudinary.js"
 const registerUser=asyncHandler(async  (req, res)=>{
    // res.status(200).json({
    //     message:"My first json data send to client from the server"
    // })

    /*
get user details from frontend
validation- empty, not empty
check if user already exists :username, email
check for images, check for avatar
upload them to cloudinary, avatar
create user object- create entry in db
remove password and refresh token field from response
check for usercreation 
return res
    */
   const {fullName,email,username,password}=req.body
   console.log("email:",email);

   //in this case i have to do manually for each filed and if condn is required
//    if(fullName==""){
//     throw new ApiError(400,"Full name is required")
//    }

//but in this case
//check if any field is empty or not
if([fullName,email,username,password].some((field)=>
    field?.trim()=="")
){
    throw new ApiError(400,"All fields are required")
}
//checked if user already exist or not
const existedUser=User.findOne({
    $or:[{username},{email}]
})
if(existedUser)
{
    throw new ApiError(409,"User with email or usename already exist")
}
const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath= req.files?.coverImage[0]?.path;
if(!avatarLocalPath){
    throw new ApiError(400,"Avatar is required")

}
const avatar =await uploadOnCloudinary(avatarLocalPath)
const coverImage=await uploadOnCloudinary(coverImageLocalPath)
if(!avatar){
    throw new ApiError(400,"Avatar is required")

}
 })
 export {registerUser}