const Book = require("../Models/bookModel");

exports.create = async (req, res) => {
  try {
   
    await Book.create(req.body);
    console.log(req.body);
    res.status(200).json({ message: "created" });
  } catch (e) {
    res.status(400).json({ message: "error" });
    console.log(e.message)
  }
};

exports.getAll = async (req, res) => {
  try {
  
    const books = await Book.find({});
  
    res.status(200).json({ found: Book.length, books });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json({ message: "found", book });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};

exports.editBook = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: " Book is Updated" });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book is Deleted" });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};
