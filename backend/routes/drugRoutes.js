const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware");
const { registerNewdrug, searched } = require("../controller/drugcontrollerjs");



//function imported from the drugcontrollerjs file to create and get new drugs
router.route("/search").get(searched);
router.route("/").post(registerNewdrug);

// .post(protect,setGoal)
// router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports = router;
