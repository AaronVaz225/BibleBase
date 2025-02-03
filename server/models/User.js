const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookshelf",
      },
    ], // References top-level folders owned by the user
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema); //apparently Mongoose pluralizes and lowercases the model name by default (so becomes users?)
