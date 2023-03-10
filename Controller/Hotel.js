import Hotel from "../Models/Hotel.js"


export const CreateHotel = async(req,res, next) =>{
    const newHotel = new Hotel(req.body)
    try {
     const savedHotel = await newHotel.save()
            res.json(savedHotel)  
    } catch (err) {
       next(err)
    }
}

export const UpDateHotel = async(req, res, next) =>{
    try {
        const upDatedHotel = await Hotel.findByIdAndUpdate( req.params.id, {$set:req.body}, {new:true})
        res.json(upDatedHotel)                             
       } catch (err) {
           next(err)
       }
       
}

export const GetHotel = async(req, res, next) =>{
    try {
        const hotel = await Hotel.findById(req.params.id)
            res.json(hotel)
    } catch (err) {
        next(err)
    }
}
export const GetAllHotel = async(req, res, next) =>{
    try {
       const hotels = await Hotel.find({})
        res.json(hotels)
    } catch (err) {
        next(err)
    }
}

export const DeleteHotel = async(req, res, next) =>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
            res.status(200).send("Data successfully deleted")
        
    } catch (err) {
       next(err)
    }
}