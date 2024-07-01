const dbConfig = require("../config/db.config.js");

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

db.students = require("./students.js")(sequelize, Sequelize);
db.instructors = require("./instructors.js")(sequelize, Sequelize);
db.courses = require("./courses.js")(sequelize, Sequelize);
db.sections = require("./sections.js")(sequelize, Sequelize);
db.studentCourses = require("./studentcourses.js")(sequelize, Sequelize);
db.faculties = require("./faculties.js")(sequelize, Sequelize);

module.exports = db;
