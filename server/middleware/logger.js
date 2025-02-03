const { format } = require("date-fns"); //for date formatting
const { v4: uuid } = require("uuid"); // the .v4() method generates a random UUID, renaming it to uuid here
const fs = require("fs"); //Node module to allow interacting with the file system (imported as a fallback)
const fsPromises = require("fs").promises; //Name as fs but is promised based
const path = require("path"); //node module which lets you work with file & directory paths

// helper function: creates a log item and checks if a log directory exists,
// if not, it makes one. Then adds the log item to the log file (logFileName)
const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss"); //formatting the date
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`; //\t is tab, \n is newline

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      //checking if the 'logs' file exists
      await fsPromises.mkdir(path.join(__dirname, "..", "logs")); //if there is no logs file, then make the log directory
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName), //appending a log entry (logItem) to a log file (logFileName)
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

//Middleware logger function (middleware has the ability to call next)
//This will fill the file very fast since it's logging everything, so add conditionals later #TODO
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next(); //moving on to another piece of middleware or the controller
};

module.exports = { logEvents, logger }; //export both because will reuse logEvents inside of an error handler
