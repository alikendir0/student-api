// seeders/20240629105000-demo-studentcourse.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "studentsections",
      [
        {
          studentNo: "24016219",
          sectionID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          studentNo: "24019102",
          sectionID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("studentsections", null, {});
  },
};
