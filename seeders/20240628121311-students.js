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
          departmentID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "33467246162",
          studentNo: "987654",
          firstName: "Alaz",
          lastName: "Yıldırdı",
          departmentID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "10000000146",
          studentNo: "543678",
          firstName: "Mustafa Kemal",
          lastName: "Atatürk",
          departmentID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "31344574810",
          studentNo: "123789",
          firstName: "Kemal",
          lastName: "Kemal",
          departmentID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "59754712516",
          studentNo: "723789",
          firstName: "Kemal",
          lastName: "Kemalettin",
          departmentID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "17571477100",
          studentNo: "125789",
          firstName: "Kemal",
          lastName: "ettin",
          departmentID: 1,
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
