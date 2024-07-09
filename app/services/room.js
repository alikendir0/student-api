const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");

const list = async () => {
  const data = await db.rooms.findAll({
    attributes: ["id", "code", "recommendedCapacity"],
  });
  const rooms = data.map((room) => room.dataValues);
  return new Response(ResponseStatus.SUCCESS, rooms);
};

const save = async (room) => {
  try {
    const data = await db.rooms.create(room);
    return new Response(ResponseStatus.SUCCESS, data);
  } catch (error) {
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      error.errors[0].message
    );
  }
};

const del = async (id) => {
  try {
    const room = await db.rooms.findOne({ where: { id: id } });
    if (room) {
      await room.destroy();
      return new Response(ResponseStatus.SUCCESS, null);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Room not found");
    }
  } catch (error) {
    console.error("Error deleting room:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const get = async (id) => {
  try {
    const room = await db.rooms.findByPk(id);
    if (room) {
      return new Response(ResponseStatus.SUCCESS, room);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Room not found");
    }
  } catch (error) {
    console.error("Error fetching room:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const edit = async (id, data) => {
  try {
    const room = await db.rooms.findByPk(id);
    if (room) {
      await room.update(data);
      return new Response(ResponseStatus.SUCCESS, room);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Room not found");
    }
  } catch (error) {
    console.error("Error updating room:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

module.exports = {
  list,
  save,
  del,
  get,
  edit,
};
