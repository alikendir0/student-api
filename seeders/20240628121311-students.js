// seeders/20240629100000-demo-student.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "students",
      [
        {
          id: "48028060750",
          studentNo: "123456",
          firstName: "Ali",
          lastName: "Kendir",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "33467246162",
          studentNo: "987654",
          firstName: "Alaz",
          lastName: "Yıldırdı",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "10000000146",
          studentNo: "543678",
          firstName: "Mustafa Kemal",
          lastName: "Atatürk",
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
