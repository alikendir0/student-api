"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "departments",
      [
        {
          name: "Computer Science",
          abbreviation: "CS",
          facultyID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Electrical Engineering",
          abbreviation: "EE",
          facultyID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mechanical Engineering",
          abbreviation: "ME",
          facultyID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Civil Engineering",
          abbreviation: "CE",
          facultyID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Industrial Engineering",
          abbreviation: "IE",
          facultyID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chemical Engineering",
          abbreviation: "CHE",
          facultyID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mathematics",
          abbreviation: "MATH",
          facultyID: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Physics",
          abbreviation: "PHYS",
          facultyID: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chemistry",
          abbreviation: "CHEM",
          facultyID: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Biology",
          abbreviation: "BIO",
          facultyID: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "History",
          abbreviation: "HIST",
          facultyID: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Philosophy",
          abbreviation: "PHIL",
          facultyID: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Psychology",
          abbreviation: "PSYCH",
          facultyID: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sociology",
          abbreviation: "SOC",
          facultyID: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Economics",
          abbreviation: "ECON",
          facultyID: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Business Administration",
          abbreviation: "BA",
          facultyID: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
