const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookshelfSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  pages: [{ type: Schema.Types.ObjectId, ref: "Page" }],
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bookshelf", bookshelfSchema);
