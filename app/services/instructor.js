const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const dbInstructor = db.instructors;

const list = async () => {
  const data = await dbInstructor.findAll({
    attributes: ["id", "firstName", "lastName", "instructorNo"],
  });
  const instructors = data.map((instructor) => instructor.dataValues);
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
