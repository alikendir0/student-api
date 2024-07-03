// seeders/20240629103000-demo-instructor.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "instructors",
      [
        {
          id: "47028060750",
          instructorNo: "373289",
          firstName: "Alice",
          lastName: "Smith",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "33467246162",
          instructorNo: "432789",
          firstName: "Bob",
          lastName: "Johnson",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("instructors", null, {});
  },
};
