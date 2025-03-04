const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const instructor = require("../controllers/instructor");
const { where } = require("sequelize");
const dbSection = db.sections;
const dbSession = db.sectionSessions;
const dbInstructor = db.instructors;
const dbCourse = db.courses;
const dbFaculties = db.faculties;
const dbRoom = db.rooms;
const dbDepartmentCourses = db.departmentCourses;

const list = async () => {
  try {
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
  } catch (error) {
    console.error("Error fetching sections:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
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
  console.log(data);

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

    var sessionSuccess = [];
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

      if (await checkConflict(-1, s.hour, s.day, s.roomNo)) {
        sessionErrors.push(s);
        continue;
      }

      await dbSession.create({
        sectionID: section.dataValues.id,
        day: s.day,
        hour: s.hour,
        roomNo: s.roomNo,
      });
      sessionSuccess.push(s);
    }

    if (sessionSuccess.length === 0) {
      await section.destroy();
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "All sessions have conflicts"
      );
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
      console.log("Current sessions", currSessions);
      console.log("New sessions", sessionsIDs);
      for (const sessionID of currSessions) {
        if (!sessionsIDs.includes(sessionID)) {
          console.log("Deleting session");
          const session = await dbSession.findByPk(sessionID);
          session.destroy();
        }
      }
      for (const sessionID of sessionsIDs) {
        if (!currSessions.includes(sessionID)) {
          console.log("Creating session");
          const temp2 = data["section-sessions"].find(
            (s) => s.id === sessionID
          );
          temp2.sectionID = id;
          if (
            await checkConflict(
              temp2.sectionID,
              temp2.hour,
              temp2.day,
              temp2.roomNo
            )
          ) {
            return new Response(
              ResponseStatus.BAD_REQUEST,
              null,
              `Session ${temp2.id} has conflict`
            );
          }
          await dbSession.create(temp2);
        }
        const session = await dbSession.findByPk(sessionID);
        if (session) {
          console.log("Updating session");
          const temp = data["section-sessions"].find((s) => s.id === sessionID);
          if (await checkConflict(temp.id, temp.hour, temp.day, temp.roomNo)) {
            return new Response(
              ResponseStatus.BAD_REQUEST,
              null,
              `Session ${temp.id} has conflict`
            );
          }
          await session.update(temp);
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
      error.errors[0].message
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

const getForStudent = async (id) => {
  try {
    const student = await db.students.findOne({
      where: { studentNo: id },
      attributes: ["departmentID", "period"],
    });
    if (!student) {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Student not found"
      );
    }

    console.log("Student", student.dataValues.departmentID);

    const sections = await dbSection.findAll({
      include: [
        {
          model: dbCourse,
          required: true,
          attributes: ["id", "code"],
          include: [
            {
              model: dbFaculties,
              required: true,
              as: "faculty",
              attributes: ["id", "name"],
            },
            {
              model: dbDepartmentCourses,
              required: true,
              where: {
                departmentID: student.dataValues.departmentID,
              },
              as: "course-department",
              attributes: ["departmentID", "period", "id", "courseID"],
            },
          ],
        },
        {
          model: dbSession,
          as: "section-sessions",
          attributes: ["id", "day", "hour", "roomNo"],
        },
        {
          model: dbInstructor,
          required: true,
          attributes: ["instructorNo", "firstName", "lastName"],
        },
      ],
      attributes: ["id", "capacity", "noStudents"],
    });

    //filtering the sections based on the period provided
    for (const section of sections) {
      if (
        section.dataValues.course.dataValues["course-department"][0].dataValues
          .period > student.dataValues.period
      ) {
        sections.splice(sections.indexOf(section), 1);
      }
    }

    return new Response(ResponseStatus.SUCCESS, sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const checkConflict = async (id, hour, day, roomNo) => {
  try {
    const sessions = await dbSection.findAll({
      include: [
        {
          model: dbSession,
          as: "section-sessions",
          required: true,
          where: {
            day: day,
            roomNo: roomNo,
          },
          attributes: ["id", "day", "hour"],
        },
      ],
      attributes: ["id"],
    });

    const [newStart, newEnd] = hour.split("-");
    const [newStartHour, newStartMinute] = newStart.split(":");
    var newStartValue = parseInt(newStartHour) * 60 + parseInt(newStartMinute);

    const [newEndHour, newEndMinute] = newEnd.split(":");
    var newEndValue = parseInt(newEndHour) * 60 + parseInt(newEndMinute);

    if (newEndValue < newStartValue) {
      newEndValue += 24 * 60;
    }

    for (const sectionsessions of sessions) {
      for (const session of sectionsessions.dataValues["section-sessions"]) {
        console.log(session.dataValues);

        if (session.dataValues.id === id) {
          continue;
        }
        const hour = session.dataValues.hour;
        //checking the hour of matching day and room
        const [start, end] = hour.split("-");
        console.log(start, end);
        const [startHour, startMinute] = start.split(":");
        var startValue = parseInt(startHour) * 60 + parseInt(startMinute);

        const [endHour, endMinute] = end.split(":");
        var endValue = parseInt(endHour) * 60 + parseInt(endMinute);
        if (endValue < startValue) {
          endValue += 24 * 60;
        }
        console.log(startValue, endValue, newStartValue, newEndValue);
        //checking if the new section time is within the time of the existing section

        if (
          (newStartValue >= startValue && newStartValue <= endValue) ||
          (newEndValue >= startValue && newEndValue <= endValue)
        ) {
          console.log("Conflict");
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    console.error("Error fetching sections:", error);
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
  delSession,
  getForStudent,
};
