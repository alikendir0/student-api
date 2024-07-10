const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const dbInstructor = db.instructors;
const dbFaculty = db.faculties;

const list = async () => {
  const data = await dbInstructor.findAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      "instructorNo",
      "facultyID",
      "gender",
    ],
  });
  const instructors = data.map((instructor) => instructor.dataValues);

  for (const instructor of instructors) {
    const faculty = await dbFaculty.findByPk(instructor.facultyID);
    instructor.facultyName = faculty.dataValues.name;
  }

  return new Response(ResponseStatus.SUCCESS, instructors);
};

const get = async (id) => {
  try {
    const instructor = await dbInstructor.findOne({
      where: { instructorNo: id },
    });
    if (instructor) {
      return new Response(ResponseStatus.SUCCESS, instructor);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Instructor not found"
      );
    }
  } catch (error) {
    console.error("Error fetching instructor:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const del = async (id) => {
  try {
    const instructor = await dbInstructor.findOne({
      where: { instructorNo: id },
    });
    if (instructor) {
      await instructor.destroy();
      return new Response(ResponseStatus.SUCCESS, null);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Instructor not found"
      );
    }
  } catch (error) {
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};

const save = async (data) => {
  try {
    const instructor = await dbInstructor.create(data);
    return new Response(ResponseStatus.SUCCESS, instructor);
  } catch (error) {
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      error.errors[0].message
    );
  }
};

const edit = async (id, data) => {
  try {
    const instructor = await dbInstructor.findOne({
      where: { instructorNo: id },
    });
    if (instructor) {
      await instructor.update(data);
      return new Response(ResponseStatus.SUCCESS, instructor);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Instructor not found"
      );
    }
  } catch (error) {
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};

const getByFaculty = async (facultyID) => {
  const data = await dbInstructor.findAll({
    where: { facultyID: facultyID },
    attributes: ["id", "firstName", "lastName", "instructorNo", "facultyID"],
  });
  const instructors = data.map((instructor) => instructor.dataValues);
  for (const instructor of instructors) {
    const faculty = await dbFaculty.findByPk(instructor.facultyID);
    instructor.facultyName = faculty.dataValues.name;
  }
  return new Response(ResponseStatus.SUCCESS, instructors);
};

module.exports = {
  list,
  get,
  del,
  edit,
  save,
  getByFaculty,
};
