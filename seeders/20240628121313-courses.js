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
          name: "World History I",
          description:
            "A survey of world history from the earliest times to the 16th century.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "HIST102",
          facultyID: 5,
          name: "World History II",
          description:
            "A survey of world history from the 16th century to the present.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "CS101",
          facultyID: 1,
          name: "Introduction to Computer Science I",
          description: "An introduction to computer science and programming.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "CS102",
          facultyID: 1,
          name: "Introduction to Computer Science II",
          description: "A continuation of Introduction to Computer Science I.",
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
