"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "students",
      [
        {
          id: "48028060750",
          studentNo: "24016219",
          firstName: "Ali",
          lastName: "Kendir",
          gender: "M",
          departmentID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "33467246162",
          studentNo: "24023548",
          firstName: "Alaz",
          lastName: "Yıldırdı",
          gender: "F",
          departmentID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "10000000146",
          studentNo: "24019102",
          firstName: "Mustafa Kemal",
          lastName: "Atatürk",
          gender: "M",
          departmentID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "31344574810",
          studentNo: "24025194",
          firstName: "Kemal",
          lastName: "Kemal",
          gender: "M",
          departmentID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "59754712516",
          studentNo: "24021111",
          firstName: "Kemal",
          lastName: "Kemalettin",
          gender: "O",
          departmentID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "17571477100",
          studentNo: "24019999",
          firstName: "Kemal",
          lastName: "ettin",
          gender: "F",
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
