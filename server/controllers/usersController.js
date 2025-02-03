const User = require("../models/User");
const Note = require("../models/Bookshelf");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//example controller functions #TODO add logic
//may not actually use these routes, might first make minimal features before ability to change password and delete account?

const getAllUsers = asyncHandler(async (req, res) => {
  res.json({ message: "Hello world" });
});

const createNewUser = asyncHandler(async (req, res) => {
  res.json({ message: "Hello world" });
});

const updateUser = asyncHandler(async (req, res) => {
  res.json({ message: "Hello world" });
});

const deleteUser = asyncHandler(async (req, res) => {
  res.json({ message: "Hello world" });
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
