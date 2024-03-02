const Course = require("../models/course");
const fileManager = require("../managers/file");
const { Response, ResponseStatus } = require("../models/response");

const coursesPath = "data/courses.json";

const list = () => {
  const courses = fileManager.getFile(coursesPath);
  return new Response(ResponseStatus.SUCCESS, courses);
};

const get = (id) => {
  const courses = fileManager.getFile(coursesPath);

  const course = courses.filter((course) => course.id === Number(id))[0];

  if (course) {
    return new Response(ResponseStatus.SUCCESS, course);
  } else {
    return new Response(ResponseStatus.BAD_REQUEST, null, "course not found");
  }
};

const del = (id) => {
  const courses = fileManager.getFile(coursesPath);

  const index = courses.findIndex((course) => course.id === Number(id));

  if (index > -1) {
    courses.splice(index, 1);
    fileManager.saveFile(coursesPath, courses);

    return new Response(ResponseStatus.SUCCESS, null);
  } else {
    return new Response(ResponseStatus.BAD_REQUEST, null, "Course not found");
  }
};

const save = (data) => {
  const courses = fileManager.getFile(coursesPath);

  const course = Course.create(data);

  if (course instanceof Course) {
    courses.push(course);
    fileManager.saveFile(coursesPath, courses);

    return new Response(ResponseStatus.CREATED, course);
  } else {
    return new Response(
      ResponseStatus.BAD_REQUEST,
      course,
      "Invalid course data"
    );
  }
};

module.exports = {
  list,
  get,
  del,
  save,
};
