const book = require("../models/bookModel");
const Book = require("../models/bookModel");

async function homeController(req, res) {
  console.log(req);
  res.status(234).end("server");
}

async function postBookController(req, res) {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Fill all the fields");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

async function displayBookHandler(req, res) {
  try {
    const book = await Book.find({});
    return res.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
async function displayParticularBook(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
async function updateHandler(req, res) {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Fil all the fields");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not Found" });
    } else {
      return res.status(200).send({ message: "Book successfully updated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
async function deleteParticularBook(req, res) {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Book not Found" });
    } else {
      return res.status(200).send({ message: "Book success fully Deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

module.exports = {
  homeController,
  postBookController,
  displayBookHandler,
  displayParticularBook,
  updateHandler,
  deleteParticularBook,
};
