// seeders/20240629103000-demo-instructor.js

"use strict";

const faculty = require("../app/controllers/faculty");

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
          facultyID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "33467246162",
          instructorNo: "432789",
          firstName: "Bob",
          lastName: "Johnson",
          facultyID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "10000000146",
          instructorNo: "543678",
          firstName: "Charlie",
          lastName: "Brown",
          facultyID: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "80292571778",
          instructorNo: "124789",
          firstName: "David",
          lastName: "White",
          facultyID: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "37518686532",
          instructorNo: "723789",
          firstName: "Eve",
          lastName: "Black",
          facultyID: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "75376200774",
          instructorNo: "123789",
          firstName: "Frank",
          lastName: "Green",
          facultyID: 1,
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
