const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library

// Middleware to authenticate JWT tokens
function authenticateToken(req, res, next) {
  // Get the Authorization header from the request
  const authHeader = req.headers["authorization"];

  // Extract the token from the header (format: "Bearer <token>") *Splits the string into an array ["Bearer", "<token>"]
  const token = authHeader && authHeader.split(" ")[1];

  // If no token is found, return a 401 Unauthorized response
  if (!token) return res.sendStatus(401);

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401); // If token is invalid/expired, return 401

    req.user = user; // Attach the decoded user data to the request object
    next(); // Move to the next middleware or route handler
  });
}

module.exports = {
  authenticateToken, // Export the function for use in other files
};

//Look at axios instance file in client for reminder on how this works
