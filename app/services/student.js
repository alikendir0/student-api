const Student = require("../models/student");
const fileManager = require("../managers/file");
const { Response, ResponseStatus } = require("../models/response");

const db = require("../../models");
const dbStudent = db.students;

const studentsPath = "data/students.json";

const list = async () => {
  const data = await dbStudent.findAll({
    attributes: ["idNo", "firstName", "lastName", "studentno"],
  });
  const students = data.map((student) => student.dataValues);
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
    const id = Number(ids[i]);
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

const assign = (id, courseIds) => {
  console.log(id, courseIds);
  const students = fileManager.getFile(studentsPath);
  const courses = fileManager.getFile("data/courses.json");
  const index = students.findIndex((student) => student.id === Number(id));
  let temp = 0;
  if (index != -1) {
    for (const c in courseIds) {
      const indexCo = courses.findIndex(
        (course) => course.id === Number(courseIds[c])
      );
      if (!students[index].courses.includes(courses[indexCo].code)) {
        students[index].courses.push(courses[indexCo].code);
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

const deassign = (studentID, courseCode) => {
  const students = fileManager.getFile(studentsPath);
  const index = students.findIndex(
    (student) => student.id === Number(studentID)
  );
  if (index != -1) {
    const courseIndex = students[index].courses.findIndex(
      (course) => course === courseCode
    );
    if (courseIndex != -1) {
      students[index].courses.splice(courseIndex, 1);
      fileManager.saveFile(studentsPath, students);
      return new Response(ResponseStatus.SUCCESS, `Success!`);
    } else
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Course not found!"
      );
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
  deassign,
};
