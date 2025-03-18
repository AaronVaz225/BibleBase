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
const User = require("./models/User");
const PORT = process.env.PORT || 3501; //PORT will wither be an environment variable if exists or 3501
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utils/utilities");
const bcrypt = require("bcrypt");

console.log(process.env.NODE_ENV);

//establishing connection to DB
connectDB();

//Middleware
app.use(logger); //Keep first
app.use(cors(corsOptions)); //Just doing app.use(cors()) makes the api public (allowing requests from any origin)
app.use(express.json()); //lets app receive and parse JSON data
app.use("/", express.static(path.join(__dirname, "public"))); //telling express where static files are & makes them accessible to client when requested
app.use(cookieParser()); //#TODO add a good comment (might delete)

//---------------------Auth API------------------------------------------------------------------------------
//Create Account #TODO hash password
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  //Checking to make sure the user entered information into each input field
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  //Check if user already exists
  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.status(400).json({
      error: true,
      message: "User already exists",
    });
  }

  //Hash the password before saving
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //Create New User
  const user = new User({
    fullName,
    email,
    password: hashedPassword, // Save hash Password
  });

  await user.save(); //saves document into DB

  //Issues token for authentication //jwt.sign(payload, secret, options)
  const accessToken = jwt.sign(
    { userId: user._id }, // changed from {user}
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "3000m", //Expires in 30 minutes
    }
  );

  return res.status(201).json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

//Login (Post request because it sends data in the body not in url like get)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find user by email
    const userInfo = await User.findOne({ email: email });
    if (!userInfo) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, userInfo.password);
    if (!isMatch) {
      return res.status(400).json({
        error: true,
        message: "Invalid Credentials",
      });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { userId: userInfo._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3000m", // Expires in 50 hours
      }
    );

    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
});

//Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const userId = req.user.userId; // changed from const {user} = req.user

  //const isUser = await User.findOne({ _id: user._id }); //_id b/c thats how mongo automatically stores ID's (so the _id is already in db if user is in there)
  const isUser = await User.findById(userId);
  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});
//------------------END Auth API--------------------------------------------------------------------------

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
