"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "departmentcourses",
      [
        {
          departmentID: 1, // Assuming a department with ID 1 exists
          courseID: 1, // Assuming a course with ID 1 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentID: 1, // Same department, different course
          courseID: 2, // Assuming a course with ID 2 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentID: 2, // Another department
          courseID: 3, // Assuming a course with ID 3 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentID: 2, // Another department
          courseID: 4, // Assuming a course with ID 4 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departmentcourses", null, {});
  },
};
