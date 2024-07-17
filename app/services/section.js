const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const instructor = require("../controllers/instructor");
const { where } = require("sequelize");
const dbSection = db.sections;
const dbSession = db.sectionSessions;
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
      {
        model: db.sectionSessions,
        as: "section-sessions",
        attributes: ["day", "hour", "roomNo", "id"],
      },
    ],
    attributes: ["id", "capacity", "noStudents"],
  });
  return new Response(ResponseStatus.SUCCESS, sectionsWithFaculties);
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

    data.instructorNo = instructor.instructorNo;
    const section = await dbSection.create(data);

    var sessionErrors = [];
    for (const s of data["section-sessions"]) {
      s.id = undefined;
      s.sectionID = data.sectionID;
      const room = await dbRoom.findOne({
        where: { code: s.roomNo },
      });
      if (!room) {
        return new Response(ResponseStatus.BAD_REQUEST, null, "Room not found");
      }

      const sessions = await dbSection.findAll({
        include: [
          {
            model: dbSession,
            as: "section-sessions",
            required: true,
            where: {
              day: s.day,
              roomNo: s.roomNo,
            },
            attributes: ["day", "hour"],
          },
        ],
        attributes: ["id"],
      });

      if (checkConflict(s.hour, sessions)) {
        sessionErrors.push(s);
        continue;
      }
      await dbSession.create({
        sectionID: section.dataValues.id,
        day: s.day,
        hour: s.hour,
        roomNo: s.roomNo,
      });
    }
    if (sessionErrors.length === data["section-sessions"].length) {
      await section.destroy();
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "All sessions have conflicts"
      );
    }

    if (sessionErrors.length > 0) {
      return new Response(
        ResponseStatus.CREATED,
        sessionErrors,
        "Some sessions have conflicts"
      );
    }

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
  try {
    const section = await dbSection.findByPk(id);
    if (section) {
      const sessionsIDs = data["section-sessions"].map((s) => s.id);
      const temp = await dbSession.findAll({
        where: {
          sectionID: id,
        },
      });
      const currSessions = temp.map((s) => s.dataValues.id);
      for (const sessionID of sessionsIDs) {
        if (!currSessions.includes(sessionID)) {
          console.log("Creating session");
          const temp2 = data["section-sessions"].find(
            (s) => s.id === sessionID
          );
          temp2.sectionID = id;
          dbSession.create(temp2);
        }
        const session = await dbSession.findByPk(sessionID);
        if (session) {
          session.update(
            data["section-sessions"].find((s) => s.id === sessionID)
          );
        }
      }
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

const delSession = async (id) => {
  try {
    const session = await dbSession.findByPk(id);
    if (session) {
      await session.destroy();
      return new Response(ResponseStatus.SUCCESS, null);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Session not found"
      );
    }
  } catch (error) {
    console.error("Error deleting session:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const checkConflict = (hour, sessions) => {
  const [newStart, newEnd] = hour.split("-");
  //assigning the start and end time to a value
  const [newStartHour, newStartMinute] = newStart.split(":");
  const newStartValue = parseInt(newStartHour) * 60 + parseInt(newStartMinute);

  const [newEndHour, newEndMinute] = newEnd.split(":");
  const newEndValue = parseInt(newEndHour) * 60 + parseInt(newEndMinute);
  for (const sectionsessions of sessions) {
    const hour =
      sectionsessions.dataValues["section-sessions"][0].dataValues.hour;
    //checking the hour of matching day and room
    const [start, end] = hour.split("-");

    const [startHour, startMinute] = start.split(":");
    const startValue = parseInt(startHour) * 60 + parseInt(startMinute);

    const [endHour, endMinute] = end.split(":");
    const endValue = parseInt(endHour) * 60 + parseInt(endMinute);
    console.log(startValue, endValue, newStartValue, newEndValue);
    //checking if the new section time is within the time of the existing section
    if (
      (newStartValue >= startValue && newStartValue <= endValue) ||
      (newEndValue >= startValue && newEndValue <= endValue)
    )
      return true;
  }
};
module.exports = {
  list,
  get,
  del,
  save,
  edit,
  delSession,
};
