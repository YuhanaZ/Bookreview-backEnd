const express = require("express");

const bookController = require("../Controllers/bookControler");
const userController = require("../Controllers/userController");

const router = express.Router();
const upload = require("../Utils/multer")

router.route("/usersPosts").get(userController.protect, bookController.usersPosts);
router.route("/create").post(userController.protect, upload.single("image"), bookController.create);
router.route("/").get(bookController.getAll)


router
  .route("/:id")
  .get(bookController.getOne)
  .put(upload.single("image"), bookController.editBook)
  .delete(bookController.deleteBook);

module.exports = router;
