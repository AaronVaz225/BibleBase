//Uds
const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "", // Text content of the page
    },
    bookshelf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookshelf",
      required: true,
    }, // Reference to the bookshelf or book this page belongs to
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Owner of the page
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
