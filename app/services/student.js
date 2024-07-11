const { Response, ResponseStatus } = require("../models/response");

const { Op } = require("sequelize");
const db = require("../managers");
const dbStudent = db.students;
const dbStudentSections = db.studentSections;
const dbSection = db.sections;
const dbDepartments = db.departments;

const list = async () => {
  const data = await dbStudent.findAll({
    attributes: ["id", "firstName", "lastName", "studentNo", "gender"],
    include: [
      {
        model: dbDepartments,
        required: true,
        attributes: ["id", "name"],
      },
    ],
    order: [["firstName", "ASC"]],
  });
  const students = data.map((student) => student.dataValues);
  return new Response(ResponseStatus.SUCCESS, students);
};

const listPage = async (query) => {
  try {
    const {
      firstName = "",
      lastName = "",
      studentNo = "",
      id = "",
      gender = "",
      departmentID = "",
      sortBy = "id",
      page = 1,
      pageSize = 10,
    } = query;

    const offset = (page - 1) * pageSize;

    const limit = pageSize;

    const whereCondition = {
      [Op.and]: [
        firstName && { firstName: { [Op.iLike]: `${firstName}` } },
        lastName && { lastName: { [Op.iLike]: `%${lastName}%` } },
        studentNo && { studentNo: { [Op.iLike]: `%${studentNo}%` } },
        id && { id: { [Op.iLike]: `%${id}%` } },
        gender && { gender: { [Op.eq]: `${gender}` } },
        departmentID && { departmentID: { [Op.eq]: `${departmentID}` } },
      ].filter(Boolean),
    };

    const { count, rows } = await dbStudent.findAndCountAll({
      attributes: ["id", "firstName", "lastName", "studentNo", "gender"],
      include: [
        {
          model: dbDepartments,
          required: true,
          attributes: ["id", "name"],
        },
      ],
      where: whereCondition,
      order: [[sortBy, "ASC"]],
      limit,
      offset,
    });

    const maxPage = Math.ceil(count / pageSize);

    const students = rows.map((student) => student.dataValues);
    return new Response(ResponseStatus.SUCCESS, {
      students,
      count,
      page,
      pageSize,
      maxPage,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const getSections = async (id) => {
  try {
    const data = await dbStudentSections.findAll({
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
    const studentSections = await dbStudentSections.findAll({
      where: { studentNo: id },
    });
    if (student && studentSections == 0) {
      await student.destroy();
      return new Response(ResponseStatus.SUCCESS, null);
    } else if (!student) {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Student not found!"
      );
    } else if (studentSections.length > 0) {
      return new Response(
        ResponseStatus.CONFLICT,
        null,
        "Student has sections assigned!"
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

const edit = async (id, data) => {
  try {
    const student = await dbStudent.findOne({ where: { studentNo: id } });
    if (student) {
      await student.update(data);
      return new Response(ResponseStatus.SUCCESS, student);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Student not found!"
      );
    }
  } catch (error) {
    console.error("Error updating student:", error);
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

    const department = await dbDepartments.findOne({
      where: { id: data.departmentID },
    });
    if (!department) {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Department not found!"
      );
    }

    const studentNo = await generateStudentNo(data.departmentID);
    console.log("StudentNo", studentNo);

    data = { ...data, studentNo: studentNo };

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
        dbStudentSections.destroy({ where: { studentNo: id } });
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
  const existingSections = studentSections.data.map(
    (section) => section.courseCode
  );
  for (const sectionID of sectionIDs) {
    try {
      const courseName = await dbSection.findOne({
        where: { id: sectionID },
        attributes: ["courseCode"],
      });
      if (
        existingSections.includes(courseName.dataValues.courseCode) ||
        successCourse.includes(courseName.dataValues.courseCode)
      ) {
        errors.push(
          `Error processing sectionID ${sectionID}: Student already assigned to this course`
        );
        failed.push(sectionID);
        continue;
      }
      await dbStudentSections.create({
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
    const studentCourse = await dbStudentSections.findOne({
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

const generateStudentNo = async (departmentID) => {
  const year = new Date().getFullYear().toString().slice(-2);
  const departmentIDPadded = departmentID.toString().padStart(2, "0");
  const uniqueDigits = await generateUniqueDigits(year, departmentIDPadded);

  return `${year}${departmentIDPadded}${uniqueDigits}`;
};

const generateUniqueDigits = async (year, departmentID) => {
  let unique = false;
  let uniqueDigits;

  while (!unique) {
    uniqueDigits = generateDigits();
    const studentExists = await dbStudent.findOne({
      where: { studentNo: `${year}${departmentID}${uniqueDigits}` },
    });
    if (!studentExists) {
      unique = true;
    }
  }
  return uniqueDigits;
};

const generateDigits = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

module.exports = {
  list,
  listPage,
  getSections,
  del,
  edit,
  save,
  reset,
  assign,
  deassign,
};
