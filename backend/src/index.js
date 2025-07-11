// require('dotenv').config({path: './env'});
import app from './app.js'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { db_name} from './constants.js';
import express from 'express'
import connectDB from './db/db1.js';
//  const app= express();
dotenv.config({
    path: './.env'
})
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port: ${process.env.PORT || 8000}`);
    }); 
})

.catch((error)=>{
    console.log("mongodb error failed",error);
})

app.get('/', async(req,res)=>{
res.send("hello")
})
/*
import express from 'express';
const app=express();
(async ()=>{
    try{
await mongoos.connect(`${process.env.MongoDB_URI}`)
app.on("error",(error)=>{
    console.log("error connecting to db",error);
   throw error
})
app.listen(process.env.PORT,()=>{  
console.log(`server is running on port ${process.env.PORT}`);   
} )
    }catch(error)
    {
        console.log("error",error);
    }

}) ()
    this is the first approach to connect to the db
    */