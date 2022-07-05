const mongoose = require("mongoose")
const Drugschema=mongoose.Schema(
    {
     DRUG:{
         type: mongoose.Schema.Types.ObjectId,
         required:true,
         ref:"Doctor"
     },   
    batchNumber:{
        type:String,
        required:[true, "please add a name "]
        },
        NafdacNumber:{
            type:String,
            default:"doctor"
        },
        expirydate:{
            type:String,
            required:[true, "specify a matric number "]
        },quantity:{
            type:String,
            required:[true, "specify a number "]
        }
    },
    
    {
        timestamps:true,
    }
)
module.exports= mongoose.model("Drug",Drugschema)