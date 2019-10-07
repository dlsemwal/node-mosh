const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to database..."))
  .catch(err => console.error("couldn't connected to database...", err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find()
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort("-price")
    .select("name author price");
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

// run();

async function updateCourse(id) {
  const docId = new mongoose.Types.ObjectId(id);
  const course = await Course.findById(docId);

  return console.log(course, id);

  if (!course) course.name = "Another Name";
  course.author = "another author";

  //   course.set({
  //     name: "Another Name",
  //     author: "Another author"
  //   });

  const result = await course.save();
  console.log(result);
}

updateCourse("5a68fdd7bee8ea64649c2777");
