// seeders/20240629100000-demo-student.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "students",
      [
        {
          idNo: "12345678901",
          studentno: "123456",
          firstName: "John",
          lastName: "Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idNo: "09876543210",
          studentno: "654321",
          firstName: "Jane",
          lastName: "Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("students", null, {});
  },
};
