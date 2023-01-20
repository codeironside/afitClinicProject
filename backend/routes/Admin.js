const express = require("express");
const router = express.Router();


const { protect } = require("../middleware/authmiddleware");
const {loginAdmin, getoneProfession, getonepatient} = require("../controller/admin/admin");




router.route("/login").post(loginAdmin)
router.route("/getone").get(protect,getoneProfession)
router.route("/getoneuser").get(protect,getonepatient)

module.exports = router;