const mongoose = require("mongoose");

const bookshelfSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Owner of the bookshelf
    parentBookshelf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookshelf",
      default: null,
    }, // Reference to the parent bookshelf (null for top-level bookshelves)
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookshelf",
      },
    ], // References to child books (sub-bookshelves)
    pages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
      },
    ], // References to pages within the bookshelf
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookshelf", bookshelfSchema);
