const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const dbSection = db.sections;
const dbInstructor = db.instructors;
const dbCourse = db.courses;

const list = async () => {
  const sectionsWithFaculties = await db.sections.findAll({
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
  const data = sectionsWithFaculties.map((section) => ({
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
    const section = await dbSection.findOne({ where: { id: id } });
    if (section) {
      return new Response(ResponseStatus.SUCCESS, section);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Section not found"
      );
    }
  } catch (error) {
    console.error("Error fetching section:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const del = async (id) => {
  try {
    const section = await dbSection.findOne({ where: { id: id } });
    if (section) {
      await section.destroy();
      return new Response(ResponseStatus.SUCCESS, null);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Section not found"
      );
    }
  } catch (error) {
    console.error("Error deleting section:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const save = async (data) => {
  try {
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

    const code = dbCourse.findOne({
      where: { code: data.courseCode },
    });
    if (!code) {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Course not found");
    }
    data.instructorNo = instructor.instructorNo;
    const section = await dbSection.create(data);
    return new Response(ResponseStatus.CREATED, section);
  } catch (error) {
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};

module.exports = {
  list,
  get,
  del,
  save,
};
