const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
      author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    User: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
// if( !mongoose.Types.ObjectId.isValid(id) ) return false;
const bookModel = mongoose.model("Book", bookSchema);

module.exports = bookModel;
