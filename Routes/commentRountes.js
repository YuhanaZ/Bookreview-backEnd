const express = require("express");

const commentController = require("../Controllers/commentControler");
const userController = require("../Controllers/userController");



const router = express.Router();


router.route("/createComment/:id").post(userController.protect, commentController.createComment);
router.route("/:id").get(commentController.PostsComment)

module.exports = router;
