const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const dbInstructor = db.instructors;

const list = async () => {
  const data = await dbInstructor.findAll({
    attributes: ["id", "firstName", "lastName"],
  });
  const instructors = data.map((instructor) => instructor.dataValues);
  return new Response(ResponseStatus.SUCCESS, instructors);
};

const get = async (id) => {
  try {
    const instructor = await dbInstructor.findOne({ where: { id: id } });
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
    const instructor = await dbInstructor.findOne({ where: { id: id } });
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
    console.error("Error deleting instructor:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const save = async (data) => {
  try {
    const instructor = dbInstructor.create(data);
    return new Response(ResponseStatus.SUCCESS, instructor);
  } catch (error) {
    console.error("Error saving instructor:", error);
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
