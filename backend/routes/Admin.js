const express = require("express");
const router = express.Router();


const { protect } = require("../middleware/authmiddleware");
const {loginAdmin, getoneProfession} = require("../controller/admin/admin");




router.route("/login").post(loginAdmin)
router.route("/getone").get(protect,getoneProfession)

module.exports = router;