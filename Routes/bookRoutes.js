const express = require("express");

const bookController = require("../Controllers/bookControler");
const router = express.Router();


router.route("/create").post(bookController.create);
router.route("/").get(bookController.getAll)

router
  .route("/:id")
  .get(bookController.getOne)
  .put(bookController.editBook)
  .delete(bookController.deleteBook);

module.exports = router;
