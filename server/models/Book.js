const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: { type: String, required: true },
  bookshelfId: {
    type: Schema.Types.ObjectId,
    ref: "Bookshelf",
    required: true,
  },
  pages: [{ type: Schema.Types.ObjectId, ref: "Page" }],
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", bookSchema);
