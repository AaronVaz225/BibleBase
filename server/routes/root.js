//This file sets up a router to handle GET requests for /, /index and /index.html and sends the index.html file from the views directory
const express = require("express");
const router = express.Router();
const path = require("path");

//all the garbage in the get path is REGEX letting the route be / , /index or /index.html making the .html part optional
router.get("^/$|/index.(html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
