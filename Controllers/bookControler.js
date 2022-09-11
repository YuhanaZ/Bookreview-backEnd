const Book = require("../Models/bookModel");
// const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  
  try {
 const found = await Book.findOne({title: req.body.title})
 if(found) {
  res.status(400).json({ message: "This book is aleady summerized"});
 }
    req.body.image = req.file.filename
    req.body.User = req.user.id
    // console.log(req.user)
     await Book.create(req.body);
    console.log(req.body);
    res.status(200).json({ message: "created"});

  } catch (e) {
    res.status(400).json({ message: "error" });
    console.log(e.message)
  }
};

exports.getAll = async (req, res) => {
  try {
  
    const books = await Book.find({}).populate("User");
  
    res.status(200).json({ found: Book.length, books });
  } catch (e) {
    res.status(400).json({ message: "error" });
    console.log(e.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("User");
    res.status(200).json({ message: "found", book });
    // console.log(book)
  } catch (e) {
    res.status(400).json({ message: "error" });
    console.log(e.message)

  }
};


exports.usersPosts = async (req, res) => {
  try {
   
    const books = await Book.find({User:req.user.id});
    // console.log(books)
    res.status(200).json({ message: "found", books});
  } catch (e) {
    res.status(400).json({ message: "error" });
    console.log(e.message)

  }
};

exports.editBook = async (req, res) => {

  try {
if(req.file){
  req.body.image = req.file.filename
}
  
    
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: " Book is Updated" });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book is Deleted" });
  } catch (e) {
    res.status(400).json({ message: "error" });
  }
};
