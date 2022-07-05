const mongoose = require("mongoose")
const clinicschema=mongoose.Schema(
    {
    name:{
        type:String,
        required:[true, "please add a name "]
        },
        role:{
            type:String,
        },
        StaffNumber:{
            type:String,
            required:[true, "specify a matric number "]
        }
    },
    
    {
        timestamps:true,
    }
)
module.exports= mongoose.model("Staff",clinicschema)