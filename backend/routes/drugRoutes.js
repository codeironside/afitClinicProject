const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware");
const { registerNewdrug, searched, updateDrugrecord } = require("../controller/pharmacist/drugcontrollerjs");



//function imported from the drugcontrollerjs file to create and get new drugs
router.route("/search").get(searched);
// router.route("/").post(registerNewdrug);

// // .post(protect,setGoal)
// router.route("/updateDrug").put(updateDrugrecord)

module.exports = router;
