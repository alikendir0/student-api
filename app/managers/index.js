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
db.studentSections = require("../models/studentsections.js")(
  sequelize,
  Sequelize
);
db.faculties = require("../models/faculties.js")(sequelize, Sequelize);
db.rooms = require("../models/rooms.js")(sequelize, Sequelize);
db.departments = require("../models/departments.js")(sequelize, Sequelize);
db.departmentCourses = require("../models/departmentcourses.js")(
  sequelize,
  Sequelize
);
db.sectionSessions = require("../models/sectionsessions.js")(
  sequelize,
  Sequelize
);

db.faculties.hasMany(db.courses, {
  foreignKey: "facultyID",
  as: "course-faculty",
});
db.courses.belongsTo(db.faculties, {
  foreignKey: "facultyID",
});

db.students.hasMany(db.studentSections, {
  foreignKey: "studentNo",
  as: "student-course",
});

db.studentSections.belongsTo(db.students, {
  foreignKey: "studentNo",
});

db.sections.hasMany(db.studentSections, {
  foreignKey: "sectionID",
  as: "section-course",
});

db.studentSections.belongsTo(db.sections, {
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

db.rooms.hasMany(db.sectionSessions, {
  foreignKey: "roomNo",
  as: "room-session",
});

db.sectionSessions.belongsTo(db.rooms, {
  foreignKey: "roomNo",
});

db.faculties.hasMany(db.departments, {
  foreignKey: "facultyID",
  as: "faculty-departments",
});

db.departments.belongsTo(db.faculties, {
  foreignKey: "facultyID",
});

db.departments.hasMany(db.departmentCourses, {
  foreignKey: "departmentID",
  as: "department-course",
});

db.departmentCourses.belongsTo(db.departments, {
  foreignKey: "departmentID",
});

db.courses.hasMany(db.departmentCourses, {
  foreignKey: "courseID",
  as: "course-department",
});

db.departmentCourses.belongsTo(db.courses, {
  foreignKey: "courseID",
});

db.departments.hasMany(db.students, {
  foreignKey: "departmentID",
  as: "department-students",
});

db.students.belongsTo(db.departments, {
  foreignKey: "departmentID",
});

db.sections.hasMany(db.sectionSessions, {
  foreignKey: "sectionID",
  as: "section-sessions",
});

db.sectionSessions.belongsTo(db.sections, {
  foreignKey: "sectionID",
});

module.exports = db;
