const mongoose = require("mongoose");


const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    User: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    Post: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
  },
  { timestamps: true }
);
// if( !mongoose.Types.ObjectId.isValid(id) ) return false;
const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
