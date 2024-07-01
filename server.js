const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const controllers = require("./app/controllers");
const db = require("./models");
const Student = db.students;
const Instructor = db.instructors;
const Course = db.courses;
const Section = db.sections;
const StudentCourses = db.studentCourses;
const Faculties = db.faculties;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

for (const controller in controllers) {
  controllers[controller](app);
}

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
