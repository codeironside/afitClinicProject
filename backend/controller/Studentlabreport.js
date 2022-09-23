const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
const studentLabReport = require("../models/studentLabReport");
const { ObjectId } = require("mongodb");

const MicroBiology = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //time in javascript?
  // var d = new Date("2011-04-20T09:30:51.01");
  // d.getHours(); // => 9
  // d.getMinutes(); // =>  30
  // d.getSeconds(); // => 51

  // var d = new Date(); // for now
  // d.getHours(); // => 9
  // d.getMinutes(); // =>  30
  // d.getSeconds(); // => 51

  const student = await Student.findById(req.params.id);
  await studentLabreport.create({
    id:req.params,id,
    timeCollected: new Date(),
    LabNo: LabNo,
    Date: new Date(),
    rank: rank,
    SVC_No: SVC_No,
    surname: student.surname,
    firstName: student.firstName,
    age:student.age,
    sex: student.sex,
    ward: ward,
    tel: tel,
    ClinicalNotesDiagnosis: ClinicalNotesDiagnosis,
    specimen: specimen,
    investigationRequired: investigationRequired,
    Date: new Date(),
    labReport: [{
        macro:macro,
        micro:micro,
        macro:macro,
        micro:micro
    }],
    Urinalysis:[{
        blood:blood,
        bilirubin:bilirubin,
        protein:protein,
        ketone:ketone,
        AceticAcid:AceticAcid,
        glucose:glucose,
        nitrate:nitrate,
        urobilinogen:urobilinogen,
        PH:PH,
        SG:SG,
        others:others
    }],
    fecalOccultBlood:fecalOccultBlood,
    culture:culture,
    sensitivityTest:sensitivityTest,
    otherResult:otherResult,
    reportedBy:[{
        name:name,
        Date:new Date()

    }],
    reviewedBy:[{
        name:name,
        date:date
    }]

  });
});
const ClinicalReport = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const student = await Student.findById(req.params.id);
  await studentLabreport.create({
        id:req.params.id,
        timeCollected: new Date(),
        LabNo: LabNo,
        Date: new Date(),
        rank: rank,
        SVC_No: SVC_No,
        surname: student.surname,
        firstName: student.firstName,
        age:student.age,
        sex: student.sex,
        ward: ward,
        tel: tel,
        ClinicalNotesDiagnosis: ClinicalNotesDiagnosis,
        specimen: specimen,
        glucose:[{
            FBS:FBS,
            RBS:RBS,
            TwoHPP:TwoHPP,
            glysatedHaemoglobin:glysatedHaemoglobin,

        }],
        LiverFunctionTestAdult:[{
            bilirubin:bilirubin,
            bilirubin:bilirubin,
            bilirubin:bilirubin,
            AKphosphate:AKphosphate,
            SGOT:SGOT,
            SGPT:SGPT,
            protein
        }]
        
  });
});
