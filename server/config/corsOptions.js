const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, OPTIONS", // Explicitly allow methods
  allowedHeaders: "Content-Type, Authorization", // Explicitly allow headers
  credentials: true, // Must be set to true if using JWT
  optionsSuccessStatus: 200, // Change to 200 instead of 204 to prevent issues
};

module.exports = corsOptions;
