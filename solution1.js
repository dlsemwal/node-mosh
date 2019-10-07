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
  return await Course.find({ isPublished: true, tags: "backend" }) //tags:'backend' only to check a single value in array
    .sort({ name: 1 }) // or sort('name')
    .select({ name: 1, author: 1 }); // or select('name author')
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
