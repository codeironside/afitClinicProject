const mongoose = require("mongoose")
const clinicschema=mongoose.Schema(
    {
    name:{
        type:String,
        required:[true, "please add a name "]
        },
        passport:{
            type:String,//will be a string,
            required:[true,"please add a photo"]
        },
        role:{
            type:String,
            default:"staff",
            required:[true,"please specify a role"]
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