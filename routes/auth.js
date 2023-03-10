import  Express  from "express";
import { Login, Register } from "../Controller/Auth.js";
const router = Express.Router()

router.post("/register", Register)
router.post("/login", Login)


export default router