const { Response, ResponseStatus } = require("../models/response");

const db = require("../managers");
const dbStudent = db.students;
const dbStudentCourses = db.studentCourses;
const dbSection = db.sections;

const list = async () => {
  const data = await dbStudent.findAll({
    attributes: ["id", "firstName", "lastName", "studentNo"],
  });
  const students = data.map((student) => student.dataValues);
  return new Response(ResponseStatus.SUCCESS, students);
};

const getSections = async (id) => {
  try {
    const data = await dbStudentCourses.findAll({
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
    const sectionIDs = data.map((data) => data.dataValues);
    const codeData = [];
    for (const d of sectionIDs) {
      const section = await dbSection.findByPk(d.sectionID, {
        attributes: ["courseCode"],
      });
      if (section) {
        codeData.push({
          sectionID: d.sectionID,
          courseCode: section.courseCode,
        });
      }
    }
    return new Response(ResponseStatus.SUCCESS, codeData);
  } catch (error) {
    console.error("Error fetching sections for student:", error);
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
    const existingID = await dbStudent.findOne({
      where: { id: data.id },
    });
    if (existingID) {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Student ID already exists!"
      );
    }
    const existingNo = await dbStudent.findOne({
      where: { studentNo: data.studentNo },
    });

    if (existingNo) {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Student number already exists!"
      );
    }
    const student = await dbStudent.create(data);
    return new Response(ResponseStatus.CREATED, student);
  } catch (error) {
    console.error("Error saving student:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};

const reset = async (ids) => {
  const errors = [];
  const failed = [];
  const success = [];

  for (const id of ids) {
    try {
      const student = dbStudent.findAll({ where: { studentNo: id } });
      if (student) {
        dbStudentCourses.destroy({ where: { studentNo: id } });
        success.push(id);
      }
    } catch (error) {
      console.error("Error reseting student:", error);
      errors.push(`Error processing studentID ${id}: ${error.message}`);
      failed.push(id);
    }
  }
  if (errors.length === ids.length) {
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
      `Successfully reseted ${success}, failed ID(s): ${failed}!`,
      null,
      errors
    );
  }
  return new Response(
    ResponseStatus.SUCCESS,
    { message: "Student(s) has been reseted successfully." },
    null
  );
};

const assign = async (id, sectionIDs) => {
  const errors = [];
  const failed = [];
  const success = [];
  const successCourse = [];
  const studentSections = await getSections(id);
  const existingCourses = studentSections.data.map(
    (section) => section.courseCode
  );
  for (const sectionID of sectionIDs) {
    try {
      const courseName = await dbSection.findOne({
        where: { id: sectionID },
        attributes: ["courseCode"],
      });
      if (
        existingCourses.includes(courseName.dataValues.courseCode) ||
        successCourse.includes(courseName.dataValues.courseCode)
      ) {
        errors.push(
          `Error processing sectionID ${sectionID}: Student already assigned to this course`
        );
        failed.push(sectionID);
        continue;
      }
      await dbStudentCourses.create({
        studentNo: id,
        sectionID: sectionID,
      });
      success.push(sectionID);
      successCourse.push(courseName.dataValues.courseCode);
    } catch (error) {
      errors.push(`Error processing sectionID ${sectionID}: ${error.message}`);
      failed.push(sectionID);
    }
  }
  if (errors.length === sectionIDs.length) {
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      errors,
      "An error occurred"
    );
  }

  if (errors.length > 0) {
    return new Response(
      ResponseStatus.SUCCESS,
      `Successfully added ${success}, failed ID(s): ${failed}!`,
      errors
    );
  }
  return new Response(
    ResponseStatus.SUCCESS,
    { message: "All sections assigned successfully" },
    null
  );
};

const deassign = async (studentID, sectionCode) => {
  try {
    const section = await dbSection.findOne({
      where: { id: sectionCode },
    });
    if (!section) {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Section not found!"
      );
    }
    const studentCourse = await dbStudentCourses.findOne({
      where: { studentNo: studentID, sectionID: sectionCode },
    });
    if (!studentCourse) {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Student not assigned to section!"
      );
    }
    await studentCourse.destroy();
    return new Response(ResponseStatus.SUCCESS, null);
  } catch (error) {
    console.error("Error deassigning section:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

module.exports = {
  list,
  getSections,
  del,
  save,
  reset,
  assign,
  deassign,
};
