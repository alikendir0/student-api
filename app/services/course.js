const db = require("../models");
const dbCourses = db.courses;
const { Response, ResponseStatus } = require("../models/response");

const list = async () => {
  const data = await dbCourses.findAll({
    attributes: ["code"],
  });
  const courses = data.map((course) => course.dataValues);
  return new Response(ResponseStatus.SUCCESS, courses);
};

const getFromName = async (id) => {
  try {
    const data = await dbCourses.findAll({
      where: { facultyID: id },
      attributes: ["code"],
    });
    const courses = data.map((course) => course.dataValues);
    return new Response(ResponseStatus.SUCCESS, courses);
  } catch (error) {
    console.error("Error fetching courses for faculty:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const get = async (id) => {
  try {
    const course = await dbCourses.findOne({ where: { code: id } });
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
    const course = await dbCourses.findOne({ where: { code: id } });
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
    const course = await dbCourses.create(data);
    return new Response(ResponseStatus.SUCCESS, course);
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
  getFromName,
  get,
  del,
  save,
};
