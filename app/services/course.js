const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const { where } = require("sequelize");
const dbCourses = db.courses;
const dbFaculty = db.faculties;
const dbDepartmentCourses = db.departmentCourses;
const dbDepartments = db.departments;

const list = async () => {
  try {
    const data = await dbCourses.findAll({
      attributes: ["id", "code", "name", "description"],
      include: [
        {
          model: dbFaculty,
          attributes: ["id", "name"],
          as: "faculty",
        },
      ],
    });
    if (data) {
      const courses = data.map((course) => ({
        id: course.id,
        code: course.code,
        name: course.name,
        description: course.description,
        facultyName: course.faculty.name,
        facultyID: course.faculty.id,
      }));
      return new Response(ResponseStatus.SUCCESS, courses);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Courses not found"
      );
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const getFromName = async (id) => {
  try {
    const data = await dbCourses.findAll({
      where: { facultyID: id },
      attributes: ["code"],
    });
    if (data) {
      const courses = data.map((course) => course.dataValues);
      return new Response(ResponseStatus.SUCCESS, courses);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Courses not found"
      );
    }
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
    const course = await dbCourses.findOne({ where: { id: id } });
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

const getFromCode = async (code) => {
  try {
    const course = await dbCourses.findOne({ where: { code: code } });
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
    const course = await dbCourses.findOne({ where: { id: id } });
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
    if (course) {
      return new Response(ResponseStatus.SUCCESS, course);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Unable to create");
    }
  } catch (error) {
    console.error("Error saving course:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};

const edit = async (id, data) => {
  console.log("Edit course", id, data);
  try {
    const course = await dbCourses.findOne({ where: { id: id } });
    if (course) {
      await course.update(data);
      return new Response(ResponseStatus.SUCCESS, course);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Course not found");
    }
  } catch (error) {
    console.error("Error updating course:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const getCoursesDepartments = async (id) => {
  try {
    const data = await dbDepartments.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: dbDepartmentCourses,
          where: { courseID: id },
          attributes: ["period", "id"],
          as: "department-course",
        },
      ],
    });
    if (data) {
      const courses = data.map((course) => ({
        departmentID: course.dataValues.id,
        departmentName: course.dataValues.name,
        id: course.dataValues["department-course"][0].id,
        period: course.dataValues["department-course"][0].period,
      }));
      return new Response(ResponseStatus.SUCCESS, courses);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Courses not found"
      );
    }
  } catch (error) {
    console.error("Error fetching courses for department:", error);
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
  getFromCode,
  get,
  del,
  save,
  edit,
  getCoursesDepartments,
};
