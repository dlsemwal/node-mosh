const Logger = require("./logger");
const logger = new Logger();

logger.on("messageLogged", args => {
  console.log("LISTNER CALLED", args);
});

logger.log("message");
