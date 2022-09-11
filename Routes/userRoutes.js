const express = require("express");


const userController = require("../Controllers/userController");


const router = express.Router();

const upload=  require("../Utils/multer")

router.route("/signup").post(upload.single("image"),userController.signup);
router.route("/login").post(userController.login);
router.route("/changePassword").put(userController.protect, userController.changePassword);

module.exports = router;
