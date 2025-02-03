const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, //must be set to true if using JWT
  optionsSuccessStatus: 200, // Default is 204 but some random things like smart TV's have trouble with 204
};

module.exports = corsOptions;
