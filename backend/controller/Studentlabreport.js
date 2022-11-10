const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
const studentLabReportMirctobioloy = require("../models/studentMedicalLabReport");
const studentLabReportClinical = require("../models/studentMedicalLabReport");
const { ObjectId } = require("mongodb");

const MicroBiology = asyncHandler(async (req, res) => {
  const {studentname} = req.body;
  //time in javascript?
  // var d = new Date("2011-04-20T09:30:51.01");
  // d.getHours(); // => 9
  // d.getMinutes(); // =>  30
  // d.getSeconds(); // => 51

  // var d = new Date(); // for now
  // d.getHours(); // => 9
  // d.getMinutes(); // =>  30
  // d.getSeconds(); // => 51
  const { role, name, ...data } = req.params;
  const student = await Student.findOne({studentname});
  const labReport = await studentLabReportMirctobioloy.create({
    studentId: student.id,
    timeCollected: new Date(),
    LabNo: LabNo,
    labattendant: labattendant,
    Date: new Date(),
    rank: rank,
    SVC_No: SVC_No,
    surname: student.surname,
    firstName: student.firstName,
    age: student.age,
    sex: student.sex,
    ward: ward,
    tel: tel,
    ClinicalNotesDiagnosis: ClinicalNotesDiagnosis,
    specimen: specimen,
    investigationRequired: investigationRequired,
    Date: new Date(),
    labReport: [
      {
        macro: macro,
        micro: micro,
        macro1: macro,
        micro1: micro,
      },
    ],
    Urinalysis: [
      {
        blood: blood,
        bilirubin: bilirubin,
        protein: protein,
        ketone: ketone,
        AceticAcid: AceticAcid,
        glucose: glucose,
        nitrate: nitrate,
        urobilinogen: urobilinogen,
        PH: PH,
        SG: SG,
        others: others,
      },
    ],
    fecalOccultBlood: fecalOccultBlood,
    culture: culture,
    sensitivityTest: sensitivityTest,
    otherResult: otherResult,
    reportedBy: reportedBy,
    reviewedBy: reviewedBy,
  });

  if (labReport) {
    res.status(202).json({
      successful: labReport,
    });
  }
});
const ClinicalReport = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const student = await Student.findById(req.params.id);
  await studentLabReportClinical.create({
    studentId: req.params.id,
    timeCollected: new Date(),
    LabNo: LabNo,
    Date: new Date(),
    rank: rank,
    SVC_No: SVC_No,
    surname: student.surname,
    firstName: student.firstName,
    age: student.age,
    sex: student.sex,
    ward: ward,
    tel: tel,
    ClinicalNotesDiagnosis: ClinicalNotesDiagnosis,
    specimen: specimen,
    glucose: [
      {
        FBS: FBS,
        RBS: RBS,
        TwoHPP: TwoHPP,
        glysatedHaemoglobin: glysatedHaemoglobin,
      },
    ],
    LiverFunctionTestAdult: [
      {
        bilirubin1: bilirubin,
        bilirubin2: bilirubin,
        bilirubin3: bilirubin,
        AKphosphate: AKphosphate,
        SGOT: SGOT,
        SGPT: SGPT,
        protein: protein,
        albumin: albumin,
      },
    ],
    bilirubinChildren: [
      {
        //new bord less than 24 hours old
        NB24HRSOlD: NB24HRSOlD,
        //new bord less than 48 hours old
        NB48HRSOlD: NB48HRSOlD,
        //new bord between 3-5 days old
        ThreeFivedays: ThreeFivedays,
        // //new bord 7 days old
        sevenDays: sevenDays,
      },
    ],
    electroylyteUreaCeratine: [
      {
        sodium: sodium,
        potassium: potassium,
        calcium: calcium,
        phosphorus: phosphorus,
        chloride: chloride,
        Bicarbonate: Bicarbonate,
        Urea: Urea,
        UricAcid: UricAcid,
        maleCeratine: maleCeratine,
        femaleCeratine: femaleCeratine,
      },
    ],
    lipidProfile: [
      {
        triglyceride: triglyceride,
        cholestorolTotal: cholestorolTotal,
        cholestorolHDL: cholestorolHDL,
        cholestorolLDL: cholestorolLDL,
      },
    ],
    others: others,
    reportedBy: reportedBy,
    reviewedBy: reviewedBy,
  });
});

module.exports = {
  ClinicalReport,
  MicroBiology,
};
