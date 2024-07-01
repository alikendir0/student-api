const Student = require("../models/student");
const { Response, ResponseStatus } = require("../models/response");

const db = require("../../models");
const dbStudent = db.students;
const dbCourse = db.studentCourses;
const dbSection = db.sections;

const studentsPath = "data/students.json";

const list = async () => {
  const data = await dbStudent.findAll({
    attributes: ["idNo", "firstName", "lastName", "studentno"],
  });
  const students = data.map((student) => student.dataValues);
  return new Response(ResponseStatus.SUCCESS, students);
};

const getCourses = async (id) => {
  try {
    const data = await dbCourse.findAll({
      where: { studentNo: id },
      attributes: ["sectionID"],
    });
    if (!data) {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Student not found!"
      );
    }
    const courseIDs = data.map((data) => data.dataValues);
    const codeData = [];
    for (const d of courseIDs) {
      const section = await dbSection.findByPk(d.sectionID, {
        attributes: ["courseCode"], // Assuming you want courseCode
      });
      if (section) {
        codeData.push(section.courseCode); // Assuming you want to push courseCode
      }
    }
    return new Response(ResponseStatus.SUCCESS, codeData);
  } catch (error) {
    console.error("Error fetching courses for student:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const del = async (id) => {
  try {
    const student = await dbStudent.findOne({ where: { studentNo: id } });
    console.log(student);
    if (student) {
      await student.destroy();
      return new Response(ResponseStatus.SUCCESS, null);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Student not found!"
      );
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const save = async (data) => {
  try {
    const student = Student.create(data);
    console.log(data);
    if (student instanceof Student) {
      await dbStudent.create(student);
      return new Response(ResponseStatus.CREATED, student);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        student,
        "Invalid student data"
      );
    }
  } catch (error) {
    console.error("Error saving student:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
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

const assign = async (id, sectionIDs) => {
  const errors = [];
  const failed = [];
  const success = [];
  for (const sectionID of sectionIDs) {
    try {
      await dbCourse.create({
        studentNo: id,
        sectionID: sectionID,
      });
      success.push(sectionID);
    } catch (error) {
      errors.push(`Error processing sectionID ${sectionID}: ${error.message}`);
      failed.push(sectionID);
    }
  }
  if (errors.length === sectionIDs.length) {
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred",
      errors
    );
  }
  if (errors.length > 0) {
    return new Response(
      ResponseStatus.SUCCESS,
      `Successfully added ${success}, failed ID(s): ${failed}!`,
      null,
      errors
    );
  }
  return new Response(
    ResponseStatus.SUCCESS,
    { message: "All sections assigned successfully" },
    null
  );
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
