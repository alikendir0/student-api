"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sectionsessions",
      [
        {
          sectionID: 1,
          day: "M",
          hour: "10:00-12:00",
          roomNo: "G-578",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sectionID: 1,
          day: "W",
          hour: "01:00-03:00",
          roomNo: "D-012",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sectionID: 2,
          day: "T",
          hour: "07:00-19:00",
          roomNo: "G-578",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sectionID: 2,
          day: "T",
          hour: "22:00-00:00",
          roomNo: "D-012",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sectionsessions", null, {});
  },
};
