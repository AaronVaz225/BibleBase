const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: false },
  bookshelfId: {
    type: Schema.Types.ObjectId,
    ref: "Bookshelf",
    required: false,
  },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Page", pageSchema);
