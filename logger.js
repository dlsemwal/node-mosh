const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("messageLogged", { url: "http://", message: "messageLogged" });
  }
}

module.exports = Logger;
