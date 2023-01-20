const express = require("express");
const router = express.Router();


const { protect } = require("../middleware/authmiddleware");
const loginAdmin = require("../controller/admin/admin");




router.route("/login").post(loginAdmin)

module.exports = router;