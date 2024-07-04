"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("instructors", {
      id: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      instructorNo: {
        allowNull: false,
        type: Sequelize.STRING(6),
        primaryKey: true,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      facultyID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "faculties",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("instructors");
  },
};
