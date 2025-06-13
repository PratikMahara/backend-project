import { asyncHandler  }  from "../utils/asyncHandler.js";
 import {ApiError} from "../utils/ApiError.js"
 import {User} from "../models/user.models.js"
 import {uploadOnCloudinary} from "../utils/cloudinary.js"
 import { ApiResponse  } from "../utils/ApiResponse.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken"
import { upload } from "../middlewares/multer.middleware.js";
import { Video } from "../models/video.models.js";
import fs from 'fs';

const uploadVideo=asyncHandler(async(req,res)=>{
const {title,description,duration}=req.body;
if([title,description,duration].some((field)=>field.trim()=="")){
  throw new ApiError(400,"All fields are required")
}
const checkvideo=await Video.findOne({
$or:[{title}]
})
if(checkvideo){
  throw new ApiError(409,"Video with same title already been uploaded")
}
const videoLocalPath=req.files?.video[0]?.path;
const thumbnailLocalPath=req.files?.thumbnail[0]?.path;
if(!videoLocalPath){
  throw new ApiError(400,"video is required for Uploading");
}
if(!thumbnailLocalPath){
  throw new ApiError(400,"thumbnail is required for Uploading");
}
const thumbnailPath=await uploadOnCloudinary(thumbnailLocalPath)
const videoPath=await uploadOnCloudinary(videoLocalPath)
if(!thumbnailPath){
   throw new ApiError(400," thumbnail is required")
}
if(!videoPath){
  throw new ApiError(400," video is required")
}
fs.unlink(thumbnailLocalPath, (err) => {
    if (err) console.error("Error deleting thumbnail:", err);
  });
  fs.unlink(videoLocalPath, (err) => {
    if (err) console.error("Error deleting video:", err);
  });

const video=await Video.create({
  title,
  description,
  duration,
  videoFile:videoPath.url,
  thumbnail: thumbnailPath.url

})
const createdVideo=await Video.findById(video._id)
if(!createdVideo){
  throw new ApiError(500,"Something went wrong while uploading")

}
return res.status(201)
.json(new ApiResponse(201,createdVideo,"Video Uploaded Successfully"))
})


export const getAllVideos = asyncHandler(async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, videos, "Videos fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching videos");
  }
});

export const getVideoById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Now using "id" instead of "videoId"
    const video = await Video.findById(id);
    
    if (!video) {
      return res.status(404).json(new ApiResponse(404, null, "Video not found"));
    }

    res.status(200).json(
      new ApiResponse(200, {
        id: video._id,
        title: video.title,
        description: video.description,
        duration: video.duration,
        videoFile: video.videoFile,
        thumbnail: video.thumbnail,
        createdAt: video.createdAt
      }, "Video fetched successfully")
    );
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
});
export const streamVideo = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    
    if (!video) {
      throw new ApiError(404, "Video not found");
    }

    const range = req.headers.range;
    if (!range) {
      return res.status(400).send("Requires Range header");
    }

    const videoPath = video.videoFile; // Cloudinary URL
    const videoSize = await getVideoSize(videoPath); // Implement this helper
    
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4"
    });

    const response = await fetch(videoPath, { headers: { Range: `bytes=${start}-${end}` } });
    response.body.pipe(res);
    
  } catch (error) {
    throw new ApiError(500, "Streaming error: " + error.message);
  }
});

export default uploadVideo;