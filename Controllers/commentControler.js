const Comment = require("../Models/commentModel")
// const post = require("../Models/bookModel")
const Book = require("../Models/bookModel")

exports.createComment = async (req, res) => {
  
    try {
      // const found = await Book.findById(req.params.id);
      // if(!found) {
      //   res.status(400).json({ message: "there is no post"});
      //  }
     

  let body = {
    
    comment:req.body.comment,
    User:req.user.id,
    Post:req.params.id
  }
       await Comment.create(body);
    //  console.log(User) 
      res.status(200).json({ message: "comment is created"});
  
    } catch (e) {
      res.status(400).json({ message: "error" });
      console.log(e.message)
    }
  };
  

  exports.PostsComment = async (req, res) => {
    try {
     
      const comments = await Comment.find({Post:req.params.id}).populate("Post").populate("User")
      // console.log(comments)
      res.status(200).json({ message: "found", comments});
    } catch (e) {
      res.status(400).json({ message: "error" });
      console.log(e.message)
  
    }
  };