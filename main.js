const express = require("express");
const app = express();
const morgan = require("morgan");
const debug = require("debug")("app:startup");
const config = require("config");
const courses = require("./routes/courses");
const home = require("./routes/home");

app.use(express.json());

// to route
app.use("/api/courses", courses);
app.use("/", home);

// Environment
console.log(`Node Environment : ${process.env.NODE_ENV}`);
console.log(`App Environment : ${app.get("env")}`);

// configuration
console.log(`Application Name : ${config.get("name")}`);
console.log(`Mail Server : ${config.get("mail.host")}`);
console.log(`App Password : ${config.get("mail.password")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("morgan enabled....");
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on ${port} port.....`);
});
