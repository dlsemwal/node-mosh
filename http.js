const express = require("express");
const app = express();

const Joi = require("joi");

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" }
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
  let id = req.params.id;
  let course = courses.find(value => value.id === parseInt(id));

  if (!course) res.status(404).send("The course was not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

app.get("/api/:id/:month/:year", (req, res) => {
  let routeParams = req.params;
  let queryParams = req.query;

  res.send({
    routeParams: routeParams,
    queryParams: queryParams
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on ${port} port.....`);
});
