// seeders/20240629105000-demo-studentcourse.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "studentcourses",
      [
        {
          studentNo: "123456",
          sectionID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          studentNo: "543678",
          sectionID: 2,
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
