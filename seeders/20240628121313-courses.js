// seeders/20240629101000-demo-course.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "courses",
      [
        {
          code: "HIST101",
          facultyID: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "HIST102",
          facultyID: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "CS101",
          facultyID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "CS102",
          facultyID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
