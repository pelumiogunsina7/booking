import  Express  from "express";
import { UpDateUser, DeleteUser, GetAllUser, GetUser } from "../Controller/user.js";
const router = Express.Router()
import  Jwt  from "jsonwebtoken";
import { verifyAdmin, VerifyToken, verifyUser } from "../Utils/VerifyToken.js";

router.get("/checkuser/:id", verifyAdmin, (req, res, next) =>{
    res.send("welcome admin you can delete all user")
} )




//Update
router.put("/:id",verifyUser, UpDateUser)
//DELETE
router.delete("/:id",verifyUser, DeleteUser)
//GET ALL
router.get("/", verifyAdmin, GetAllUser)
//GET 
router.get("/:id", verifyAdmin, GetUser)
 

export default router