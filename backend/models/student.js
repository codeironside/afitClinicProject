const mongoose = require("mongoose")
const staffschema=mongoose.Schema(
    {
    name:{
        type:String,
        required:[true, "please add at name value"]
        },
    matricNumber:{
        type:String,
        required:[true, "please add an matric number"],
        unique:true
        },
    YOB:{
        type:String,
        required:[true, "please include a year of birth"]
        },
        bloodGroup:{
            type:String,
            required:[true, "please include a blood group"]
            },
        genotype:{
            type:String,
            required:[true, "please include a genotype"]
            },
    phoneNumber:{
        type:String,
        required:[true, "please include a year of birth"]
        },
    disabilities:{
        type:String,
        required:[true, "please include a year of birth"]
        },
        admissionLetter:{
            type:String//should be a file system fs url saved here 
        },
        proveOfPayemt:{
            type:String// should be an file system url here to
        },
        diagnosis:[
            {
                diagnosedBY:{
                    type: String
                },
                doctor:{
                    type:String
                },
                diagnosed:[
                    {
                        ailment:{
                            type:String
                        },
                        diagnosis:{
                            type:String
                        }
                }],
                Date:{
                    type:String
                }
    
            }
        ],
    prescriptions:
       [
        {
            prescription:{
                type: String
            },
            givenBy:{
                type:String
            },
            Date:{
                type:String
            }

        }
    ]
        
    ,
            referrals:{
                type:String
            },
            previousDiagnosis:{
                type:String
            }
    },
    {
        timestamps:true
    }
)
module.exports= mongoose.model("Student",staffschema)