const Course = require("../models/course");
const fileManager = require("../managers/file");
const { Response, ResponseStatus } = require("../models/response");
const db = require("../../models");
const {
  attribute,
} = require("@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/attribute.js");
const dbCourse = db.courses;
const dbSection = db.sections;
const dbInstructor = db.instructors;

const coursesPath = "data/courses.json";

const list = async () => {
  const coursesWithFaculties = await db.sections.findAll({
    include: [
      {
        model: db.courses,
        required: true,
        attributes: ["code"],
        include: [
          {
            model: db.faculties,
            required: true,
            attributes: ["name"],
          },
        ],
      },
      {
        model: db.instructors,
        required: true,
        attributes: ["firstName", "lastName"],
      },
    ],
    attributes: ["id", "day", "hour", "place", "capacity", "noStudents"],
  });
  const data = coursesWithFaculties.map((section) => ({
    ...section.dataValues,
    courseCode: section.course.dataValues.code,
    instructor: {
      firstName: section.instructor.dataValues.firstName,
      lastName: section.instructor.dataValues.lastName,
    },
    faculty: section.course.faculty.dataValues.name,
  }));
  return new Response(ResponseStatus.SUCCESS, data);
};

const get = async (id) => {
  try {
    const course = await dbSection.findOne({ where: { id: id } });
    if (course) {
      return new Response(ResponseStatus.SUCCESS, course);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Course not found");
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const del = async (id) => {
  try {
    const course = await dbSection.findOne({ where: { id: id } });
    if (course) {
      await course.destroy();
      return new Response(ResponseStatus.SUCCESS, null);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Course not found");
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const save = async (data) => {
  try {
    const course = Course.create(data);
    const instructor = await dbInstructor.findOne({
      where: {
        firstName: data.instructor.firstName,
        lastName: data.instructor.lastName,
      },
      attributes: ["instructorNo"],
    });
    if (!instructor) {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Instructor not found"
      );
    }
    data.instructorNo = instructor.instructorNo;
    if (course instanceof Course) {
      await dbSection.create(data);
      return new Response(ResponseStatus.CREATED, course);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        course,
        "Invalid course data"
      );
    }
  } catch (error) {
    console.error("Error saving course:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

module.exports = {
  list,
  get,
  del,
  save,
};
