// seeders/20240629102000-demo-faculty.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "faculties",
      [
        {
          name: "Engineering",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Science",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("faculties", null, {});
  },
};
