 import { asyncHandler  }  from "../utils/asyncHandler.js";
 const registerUser=asyncHandler(async  (req, res)=>{
    res.status(200).json({
        message:"My first json data send to client from the server"
    })
 })
 export {registerUser}