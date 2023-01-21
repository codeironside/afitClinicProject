const asyncHandler = require("express-async-handler");

//@route api/patient/prescribtion
//access private
//desc prescribtion for student

const prescribtion = asyncHandler(async (req, res) => {
    const { id } = req.staff;
    const staff = await Patient.findById(id);
  if (staff.role==="doctor"|| staff.role === "superAdmin") {
    const { drugName, dosage, frequncy, patienId } = req.body;
    // console.log(req.staff)
    
    
    var prescribedDrugs = [];
    prescribedDrugs.push(drugName);
    prescribedDrugs.push(dosage);
    const patientfound = await Patient.findOne({ patientId: patientId });
    if (patientfound) {
    }
    const Drugfound = await Drug.findOne({ DrugNamelowercased: drugName });
    if (!Drugfound) {
      res.status(403).json({
        message: "Drug not found",
      });
    }
    var disbursed= false
    const prescribed = await patientPrescribtion.create({
      studentId: patientfound._id,
      studentName: `${patientfound.firsname}  ${patientfound.middlename}  ${patientfound.surname}`,
      patientId: patientfound.patienId,
      drugName: drugName,
      dosage:dosage,
      frequncy: frequncy,
      disbursed:disbursed
    });
    await Drug.findByIdAndUpdate(
      Drugfound._id,
      {
        $inc: {
          CurrentQuantity: -parseInt(dosage),
          // previousQuantity: druquantity.CurrentQuantity,
        },
      },
      { new: true }
    );
    if (prescribed) {
      res.status(202).json(prescribed);
    }
  }else if(i){

  }
});
