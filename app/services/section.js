const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const instructor = require("../controllers/instructor");
const dbSection = db.sections;
const dbInstructor = db.instructors;
const dbCourse = db.courses;
const dbRoom = db.rooms;

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
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: db.instructors,
        required: true,
        attributes: ["instructorNo", "firstName", "lastName"],
      },
    ],
    attributes: ["id", "day", "roomNo", "hour", "capacity", "noStudents"],
  });
  const data = sectionsWithFaculties.map((section) => ({
    ...section.dataValues,
    courseCode: section.course.dataValues.code,
    instructor: {
      instructorNo: section.instructor.dataValues.instructorNo,
      firstName: section.instructor.dataValues.firstName,
      lastName: section.instructor.dataValues.lastName,
    },
    instructorNo: section.instructor.dataValues.instructorNo,
    faculty: section.course.faculty.dataValues.name,
    facultyID: section.course.faculty.dataValues.id,
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
        instructorNo: data.instructorNo,
      },
    });
    if (!instructor) {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Instructor not found"
      );
    }
    const code = await dbCourse.findOne({
      where: { code: data.courseCode },
    });

    if (!code) {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Course not found");
    }
    const room = await dbRoom.findOne({
      where: { code: data.roomNo },
    });
    if (!room) {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Room not found");
    }
    data.instructorNo = instructor.instructorNo;
    const section = await dbSection.create(data);
    return new Response(ResponseStatus.CREATED, section);
  } catch (error) {
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      error.errors[0].message
    );
  }
};

const edit = async (id, data) => {
  console.log("Edit section", id, data);
  try {
    const section = await dbSection.findByPk(id);
    if (section) {
      await section.update(data);
      return new Response(ResponseStatus.SUCCESS, section);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Section not found"
      );
    }
  } catch (error) {
    console.error("Error updating section:", error);
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
  edit,
};
