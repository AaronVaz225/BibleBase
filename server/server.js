//API for BibleBase, should define the CRUD Routes to communicate with database and frontend
//Keep require('dotenv').config() at the top
require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`port running on port ${port}`);
});

//---------CRUD Routes (API Part)--------------------------------------------
//Example route: http://localhost:3001/getBible
app.get("/getBible", (req, res) => {
  res.json({
    status: "success",
    book: "Genesis",
  });
});
