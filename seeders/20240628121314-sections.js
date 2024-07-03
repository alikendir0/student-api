// seeders/20240629104000-demo-section.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sections",
      [
        {
          courseCode: "HIST101",
          day: "T",
          hour: "8:00-9:00",
          place: "D012",
          instructorNo: "432789",
          capacity: 50,
          noStudents: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseCode: "HIST102",
          day: "M",
          hour: "12:00-13:00",
          place: "G578",
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
