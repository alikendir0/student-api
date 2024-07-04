const dbConfig = require("../../config/db.config.js");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("../models/students.js")(sequelize, Sequelize);
db.instructors = require("../models/instructors.js")(sequelize, Sequelize);
db.courses = require("../models/courses.js")(sequelize, Sequelize);
db.sections = require("../models/sections.js")(sequelize, Sequelize);
db.studentCourses = require("../models/studentsections.js")(
  sequelize,
  Sequelize
);
db.faculties = require("../models/faculties.js")(sequelize, Sequelize);
db.rooms = require("../models/rooms.js")(sequelize, Sequelize);

db.faculties.hasMany(db.courses, {
  foreignKey: "facultyID",
  as: "course-faculty",
});
db.courses.belongsTo(db.faculties, {
  foreignKey: "facultyID",
});

db.students.hasMany(db.studentCourses, {
  foreignKey: "studentNo",
  as: "student-course",
});

db.studentCourses.belongsTo(db.students, {
  foreignKey: "studentNo",
});

db.sections.hasMany(db.studentCourses, {
  foreignKey: "sectionID",
  as: "section-course",
});

db.studentCourses.belongsTo(db.sections, {
  foreignKey: "sectionID",
});

db.courses.hasMany(db.sections, {
  foreignKey: "courseCode",
  sourceKey: "code",
  as: "courseSections",
});

db.sections.belongsTo(db.courses, {
  foreignKey: "courseCode",
  targetKey: "code",
});

db.instructors.hasMany(db.sections, {
  foreignKey: "instructorNo",
  as: "instructor-sections",
});
db.sections.belongsTo(db.instructors, {
  foreignKey: "instructorNo",
});

db.instructors.belongsTo(db.faculties, {
  foreignKey: "facultyID",
});

db.faculties.hasMany(db.instructors, {
  foreignKey: "facultyID",
  as: "faculty-instructors",
});

db.rooms.hasMany(db.sections, {
  foreignKey: "roomNo",
  as: "room-sections",
});

db.sections.belongsTo(db.rooms, {
  foreignKey: "roomNo",
});

module.exports = db;
