const Student = require("../models/student");
const fileManager = require("../managers/file");
const { Response, ResponseStatus } = require("../models/response");

const studentsPath = "data/students.json";

const list = () => {
  const students = fileManager.getFile(studentsPath);
  return new Response(ResponseStatus.SUCCESS, students);
};

const getCourses = (id) => {
  const students = fileManager.getFile(studentsPath);

  const student = students.filter((student) => student.id === Number(id))[0];

  if (student) {
    return new Response(ResponseStatus.SUCCESS, student.courses);
  } else {
    return new Response(ResponseStatus.BAD_REQUEST, null, "Student not found");
  }
};

const del = (id) => {
  const students = fileManager.getFile(studentsPath);

  const index = students.findIndex((student) => {
    if (student.id === Number(id)) {
      return id;
    }
  });

  if (index > -1) {
    students.splice(index, 1);
    fileManager.saveFile(studentsPath, students);

    return new Response(ResponseStatus.SUCCESS, null);
  } else {
    return new Response(ResponseStatus.BAD_REQUEST, null, "Student not found");
  }
};

const save = (data) => {
  const students = fileManager.getFile(studentsPath);

  const student = Student.create(data);

  if (student instanceof Student) {
    students.push(student);
    fileManager.saveFile(studentsPath, students);

    return new Response(ResponseStatus.CREATED, student);
  } else {
    return new Response(
      ResponseStatus.BAD_REQUEST,
      student,
      "Invalid student data"
    );
  }
};

const reset = (ids) => {
  var success = [];
  var failure = [];
  const students = fileManager.getFile(studentsPath);

  for (const i in ids) {
    const id = ids[i];
    console.log(id);
    const index = students.findIndex((student) => student.id === id);
    if (index != -1) {
      students[index].courses = [];
      success.push(id);
    } else {
      failure.push(id);
    }
  }
  fileManager.saveFile(studentsPath, students);
  if (success.length > 0) {
    return new Response(
      ResponseStatus.SUCCESS,
      `Successful ids:[${success}] Failed ids:[${failure}]`
    );
  } else {
    return new Response(ResponseStatus.BAD_REQUEST, null, "Student not found!");
  }
};

const assign = (id, courses) => {
  const students = fileManager.getFile(studentsPath);
  const index = students.findIndex((student) => student.id === Number(id));
  var temp = 0;
  if (index != -1) {
    for (const c in courses) {
      if (!students[index].courses.includes(courses[c])) {
        students[index].courses.push(courses[c]);
        temp++;
      }
    }
    if (temp > 0) {
      fileManager.saveFile(studentsPath, students);
      return new Response(ResponseStatus.SUCCESS, `Success!`);
    } else return new Response(ResponseStatus.CONFLICT, `Code Conflict!`);
  } else
    return new Response(ResponseStatus.BAD_REQUEST, null, "Student not found!");
};

module.exports = {
  list,
  getCourses,
  del,
  save,
  reset,
  assign,
};
