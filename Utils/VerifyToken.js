import Jwt  from "jsonwebtoken";
import { CreateError } from "./error.js";

export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token 
    if(!token){
        return next(CreateError(401, "user not Authenticated"))
    } 
    Jwt.verify(token, process.env.Jwt_secKey, (err, user) =>{
      if(err) return next(CreateError(403, "invalid token"))
      req.user = user
      next()
    })
  }

  export const verifyUser = (req, res, next) =>{
        VerifyToken(req, res, next,() => {
            if(req.user.id === req.params.id || req.user.isAdmin){
                next()
            }else{
                if(err) return next(CreateError(403, "you are not authorized"))
            }
        })
  }


  export const verifyAdmin = (req, res, next) =>{
        VerifyToken(req, res, next,() => {
            if(req.user.isAdmin){
                next()
            }else{
                if(err) return next(CreateError(403, "you are not authorized"))
            }
        })
  }