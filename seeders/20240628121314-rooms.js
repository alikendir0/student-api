// seeders/[timestamp]-rooms.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "rooms",
      [
        {
          code: "D-012",
          recommendedCapacity: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "G-578",
          recommendedCapacity: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rooms", null, {});
  },
};
