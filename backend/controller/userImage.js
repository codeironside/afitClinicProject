const imageURI = require("../middleware/multer")
const Staff = require('../models/staff')

const uploadImage =asyncHandler(async(req,res)=>{
    try{
        const user = new User(req.body)
        await User.save();
        res.status(201).send(user)

    }catch(error){
        res.status(400).send(error)
    }
})
