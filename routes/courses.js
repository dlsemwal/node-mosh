const express = require("express");
const Joi = require("joi");

const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" }
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let course = courses.find(value => value.id === parseInt(id));

  if (!course) res.status(404).send("The course was not found");
  res.send(course);
});

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  // check for id and course
  const id = req.params.id;
  const course = courses.find(e => e.id === parseInt(id));
  if (!course) return res.status(404).send("The course was not found.");

  //   validate input
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //   update
  course.name = req.body.name;

  //   send updated course to object
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find(e => e.id === parseInt(id));

  if (!course) return res.status(404).send("The course was not found.");

  //   find index no. of course
  const index = courses.indexOf(course);

  //   delete course
  courses.splice(index, 1);

  //   send deleted course into response
  res.send(course);
});

function validate(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;
