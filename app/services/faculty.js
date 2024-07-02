const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const dbFaculty = db.faculties;

const list = async () => {
  const data = await dbFaculty.findAll({
    attributes: ["id", "name"],
  });
  const faculties = data.map((faculty) => faculty.dataValues);
  return new Response(ResponseStatus.SUCCESS, faculties);
};

const get = async (id) => {
  try {
    const faculty = await dbFaculty.findOne({ where: { id: id } });
    if (faculty) {
      return new Response(ResponseStatus.SUCCESS, faculty);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Faculty not found"
      );
    }
  } catch (error) {
    console.error("Error fetching faculty:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const del = async (id) => {
  try {
    const faculty = await dbFaculty.findOne({ where: { id: id } });
    if (faculty) {
      await faculty.destroy();
      return new Response(ResponseStatus.SUCCESS, null);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Faculty not found"
      );
    }
  } catch (error) {
    console.error("Error deleting faculty:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const save = async (data) => {
  try {
    const faculty = await dbFaculty.create(data);
    return new Response(ResponseStatus.SUCCESS, faculty);
  } catch (error) {
    console.error("Error saving faculty:", error);
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
