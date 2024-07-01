// seeders/20240629105000-demo-studentcourse.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "studentcourses",
      [
        {
          studentno: "123456",
          sectionID: 1,
          courseID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          studentno: "654321",
          sectionID: 2,
          courseID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("studentcourses", null, {});
  },
};
