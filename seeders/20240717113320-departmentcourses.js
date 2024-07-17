"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "departmentcourses",
      [
        {
          departmentID: 1,
          period: 1,
          courseID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentID: 2,
          period: 3,
          courseID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentID: 1,
          period: 1,
          courseID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentID: 2,
          period: 1,
          courseID: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentID: 2,
          period: 1,
          courseID: 4,
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
