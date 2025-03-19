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
const Bookshelf = require("./models/Bookshelf");
const Book = require("./models/Book");
const Page = require("./models/Page");
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
    { userId: user._id },
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
  const userId = req.user.userId;

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

//-------------------Notes API---------------------------------------------------------------------------
//Create a Bookshelf
app.post("/bookshelves", authenticateToken, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;

  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const bookshelf = new Bookshelf({ name, userId });
    await bookshelf.save();
    res.status(201).json(bookshelf);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all bookshelves
app.get("/bookshelves", authenticateToken, async (req, res) => {
  try {
    const bookshelves = await Bookshelf.find({
      userId: req.user.userId,
    }).populate("books pages");
    res.json(bookshelves);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
});

// Delete a Bookshelf
app.delete("/bookshelves/:bookshelfId", authenticateToken, async (req, res) => {
  try {
    // Delete the bookshelf
    const shelf = await Bookshelf.findByIdAndDelete(req.params.bookshelfId);
    if (!shelf) return res.status(404).json({ message: "Bookshelf not found" });

    // Optionally, delete all books and pages associated with this bookshelf
    await Book.deleteMany({ bookshelfId: req.params.bookshelfId });
    await Page.deleteMany({ bookshelfId: req.params.bookshelfId });

    res.json({ message: "Bookshelf deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//Create a book inside a bookshelf
app.post("/books", authenticateToken, async (req, res) => {
  const { name, bookshelfId } = req.body;

  if (!name || !bookshelfId)
    return res
      .status(400)
      .json({ message: "Name and Bookshelf ID are required" });

  try {
    const book = new Book({ name, bookshelfId });
    await book.save();

    // Add book reference to the bookshelf
    await Bookshelf.findByIdAndUpdate(bookshelfId, {
      $push: { books: book._id },
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all books in a bookshelf
app.get(
  "/books/bookshelf/:bookshelfId",
  authenticateToken,
  async (req, res) => {
    try {
      const books = await Book.find({
        bookshelfId: req.params.bookshelfId,
      }).populate("pages");
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// Get a single book by ID
app.get("/books/:bookId", authenticateToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate("pages");
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a book
app.delete("/books/:bookId", authenticateToken, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Remove book reference from bookshelf
    await Bookshelf.findByIdAndUpdate(book.bookshelfId, {
      $pull: { books: book._id },
    });

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create a page inside a book or bookshelf
app.post("/pages", authenticateToken, async (req, res) => {
  const { title, content, bookId, bookshelfId } = req.body;

  if (!title || (!bookId && !bookshelfId)) {
    return res.status(400).json({
      message: "Title and either Book ID or Bookshelf ID are required",
    });
  }

  try {
    const page = new Page({ title, content, bookId, bookshelfId });
    await page.save();

    // Add page reference to the correct parent
    if (bookId) {
      await Book.findByIdAndUpdate(bookId, { $push: { pages: page._id } });
    } else if (bookshelfId) {
      await Bookshelf.findByIdAndUpdate(bookshelfId, {
        $push: { pages: page._id },
      });
    }

    res.status(201).json(page);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all pages in a book
app.get("/pages/book/:bookId", authenticateToken, async (req, res) => {
  try {
    const pages = await Page.find({ bookId: req.params.bookId });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all pages in a bookshelf (not inside books)
app.get(
  "/pages/bookshelf/:bookshelfId",
  authenticateToken,
  async (req, res) => {
    try {
      const pages = await Page.find({ bookshelfId: req.params.bookshelfId });
      res.json(pages);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// Get a single page by ID
app.get("/pages/:pageId", authenticateToken, async (req, res) => {
  try {
    const page = await Page.findById(req.params.pageId);
    if (!page) return res.status(404).json({ message: "Page not found" });

    res.json(page);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update page content
app.put("/pages/:pageId", authenticateToken, async (req, res) => {
  const { content } = req.body;

  try {
    const page = await Page.findByIdAndUpdate(
      req.params.pageId,
      { content },
      { new: true }
    );
    if (!page) return res.status(404).json({ message: "Page not found" });

    res.json(page);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a page
app.delete("/pages/:pageId", authenticateToken, async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.pageId);
    if (!page) return res.status(404).json({ message: "Page not found" });

    // Remove page reference from parent
    if (page.bookId) {
      await Book.findByIdAndUpdate(page.bookId, { $pull: { pages: page._id } });
    } else if (page.bookshelfId) {
      await Bookshelf.findByIdAndUpdate(page.bookshelfId, {
        $pull: { pages: page._id },
      });
    }

    res.json({ message: "Page deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//---------------------End Notes API-------------------------------------------------------------------
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
