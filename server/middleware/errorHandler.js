//create errorHandler middleware to log the error name, message, request method, request url and the headers.origin. log the err.stack to the console
//if there is a statusCode, then respond with that, else just respond with 500
//also res with a json showing the err.message
const { logEvents } = require("./logger");

//you can override express's build in error handling just by creating middleware who's first param is err
const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );

  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; //500 is server error

  res.status(status);

  res.json({ message: err.message });
};

module.exports = errorHandler;
