"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "departments",
      [
        {
          name: "Computer Science",
          abbreviation: "CS",
          facultyID: 1, // Assuming a faculty with ID 1 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Electrical Engineering",
          abbreviation: "EE",
          facultyID: 2, // Assuming a faculty with ID 2 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more departments as needed
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
