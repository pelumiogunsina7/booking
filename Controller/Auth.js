import User from "../Models/User.js"
import bcrypt from "bcryptjs"
import { CreateError } from "../Utils/error.js"
import Jwt from "jsonwebtoken"
import { config } from "dotenv"

export const Register = async(req, res, next) =>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            userName:req.body.userName,
            email:req.body.email,
            password:hash,
        })
        await newUser.save()
        res.status(200).send("user has been created")
    } catch (err) {
        next(err)
    }
}
export const Login = async(req, res, next) =>{
    try {
      const user = await User.findOne({userName:req.body.userName})
      if(!user) return next(CreateError(404, "User not found"))

      const isPassword = await bcrypt.compare(req.body.password, user.password)
      if(!isPassword) return next(CreateError(400, "Wrong password or Username"))

      const token = Jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.Jwt_secKey)
        
        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json({...otherDetails})
    } catch (err) {
        next(err)
    }
}