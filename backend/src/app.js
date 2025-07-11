import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express()
app.use(cors({
    origin:"https://backend-project-frontend-662c.onrender.com",
    credentials:true
}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes

import userRouter from './routes/user.routes.js'
import videoRouter from './routes/video.routes.js'
//routes declaration
app.use("/api/users",userRouter)
app.use("/api/videos",videoRouter)
//http://localhost:8000/api/users/register
export default app;
