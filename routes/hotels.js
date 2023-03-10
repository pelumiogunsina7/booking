import  Express  from "express";
const router = Express.Router()
import Hotel from "../Models/Hotel.js"
import mongoose from "mongoose";
import { CreateError } from "../Utils/error.js";
import { CreateHotel, DeleteHotel, GetAllHotel, GetHotel, UpDateHotel } from "../Controller/Hotel.js";
import { verifyAdmin } from "../Utils/VerifyToken.js";
//create
router.post("/", verifyAdmin, CreateHotel)
//UPDATE
router.put("/:id", verifyAdmin, UpDateHotel)
//DELETE
router.delete("/:id", verifyAdmin, DeleteHotel)
//GET ALL
router.get("/", GetAllHotel)
//GET 
router.get("/:id", GetHotel)
 

export default router