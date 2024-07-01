// seeders/20240629104000-demo-section.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sections",
      [
        {
          coursecode: "HIST101",
          day: "MWF",
          hour: "8:00-9:00",
          place: "D012",
          instructorno: "INS001",
          capacity: 50,
          nostudents: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          coursecode: "HIST101",
          day: "TTH",
          hour: "1:00-3:00",
          place: "B119",
          instructorno: "INS001",
          capacity: 50,
          nostudents: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          coursecode: "HIST102",
          day: "MWF",
          hour: "6:00-8:00",
          place: "F422",
          instructorno: "INS002",
          capacity: 50,
          nostudents: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          coursecode: "HIST102",
          day: "TTH",
          hour: "12:00-13:00",
          place: "G578",
          instructorno: "INS002",
          capacity: 50,
          nostudents: 45,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sections", null, {});
  },
};
