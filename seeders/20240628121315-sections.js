// seeders/20240629104000-demo-section.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sections",
      [
        {
          courseCode: "HIST101",
          instructorNo: "432789",
          capacity: 50,
          noStudents: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseCode: "HIST102",
          instructorNo: "373289",
          capacity: 50,
          noStudents: 45,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sections", null, {});
  },
};
