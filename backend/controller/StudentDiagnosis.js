//inssert new records
const diagnosis = asyncHandler(async (req, res) => {
    const { doctor, prescribtions, diagnosis, ailment } = req.body;
    // console.log(req.params.proofid)
    const student = await Student.findById(req.params.id);
    // console.log(student)
  
    if (!student) {
      // res.status(400)
      throw new Error("student record not found ");
    }
    //update schema with mongoose?
    const studentDiagnosed = await studentDiagnosis.create({
      studentId: req.params.id,
      doctor: doctor,
      prescribtions: prescribtions,
      diagnosis: diagnosis,
      ailment: ailment,
      Date: new Date(),
    });
    //date in javascript?
  
    res.status(200).json(studentDiagnosed);
  });