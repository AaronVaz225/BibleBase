require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path"); //imports node.js path module, which lets you work with file and directory paths
const cookieParser = require("cookie-parser");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3501; //PORT will wither be an environment variable if exists or 3501

console.log(process.env.NODE_ENV);

//establishing connection to DB
connectDB();

//Middleware
app.use(logger); //Keep first
app.use(cors(corsOptions)); //Just doing app.use(cors()) makes the api public (allowing requests from any origin)
app.use(express.json()); //lets app receive and parse JSON data
app.use("/", express.static(path.join(__dirname, "public"))); //telling express where static files are & makes them accessible to client when requested
app.use(cookieParser()); //#TODO add a good comment

app.use("/", require("./routes/root")); // '/' is the root directory of this project, and is using my routes file
app.use("/users", require("./routes/userRoutes")); //#TODO make sure im okay with using users as an endpoint

//Route to handle any unknown route (app.all applies to all HTTP methods: GET, POST etc.) (* is a catch all for all unknown routes)
app.all("*", (req, res) => {
  res.status(404);

  //Serving different responses based on what the client accepts TODO- left other response types for testing in postman, could clean up later
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler); // keep at the end here

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
