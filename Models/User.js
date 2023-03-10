import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        unique:true
    },
    isAdmin:{
        type: Boolean,
        default:false,
    },
},
{timestamps:true}
)

UserSchema.set('toJSON', {
    transform:(document, returendObj) =>{
      returendObj.id = returendObj._id.toString()
      delete returendObj._id
      delete returendObj.__v
    }
  })

export default mongoose.model("User", UserSchema)