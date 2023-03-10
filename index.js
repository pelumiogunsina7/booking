import express from "express";
//const express = require("express")
import dotenv from "dotenv"
const app = express()
dotenv.config()
import mongoose from "mongoose";
//const mongoose = require('mongoose')
import Authroute from "./routes/auth.js"
import Userroute from "./routes/Users.js"
import Hotelroute from "./routes/hotels.js"
import Roomroute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
// Or:

 /* const connect = async () =>{
    try {
        await mongoose.connect(process.env.Mongo);
        console.log("connected to cloudMongoDb")
      } catch (error) {
       throw(error);
      }
}  */

mongoose.connect(process.env.Mongo)
mongoose.set('strictQuery', false)
mongoose.connection.on("disconnected", () =>{
    console.log("MongoDb disconnected")
})

mongoose.connection.on("connected", () =>{
    console.log("MongoDb connected")
})
app.get("/user",(req, res) =>{
    res.send("hello fist page")
})

//middleware
app.use(cookieParser())
app.use(express.json())
app.use("/routes/auth", Authroute)
app.use("/routes/rooms", Roomroute)
app.use("/routes/Users", Userroute)
app.use("/routes/hotels",Hotelroute)

//error handling
app.use((err, req, res, next) =>{
    const errStatus = err.status || 500
    const errMessage = err.message || "something went wrong"
    const errStack = err.stack
    return res.status(errStatus).json({
        success:false,
        status: errStatus,
        message:errMessage,
        stack:  errStack
    })
})

app.listen(9900, () => {
    //connect()
    console.log("connected to backend!!!")
})