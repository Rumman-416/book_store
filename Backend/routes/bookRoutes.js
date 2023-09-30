const express = require("express");

const {
  postBookController,
  displayBookHandler,
  displayParticularBook,
  updateHandler,
  deleteParticularBook,
} = require("../controllers/index");

const router = express.Router();

//route to insert the value of books into the db
router.post("/", postBookController);

//route to display all the data from db
router.get("/", displayBookHandler);

//route to display a particular data from db with id
router.get("/:id", displayParticularBook);

//route to update data
router.put("/:id", updateHandler);

//route to delete data
router.delete("/:id", deleteParticularBook);

module.exports = router;
