"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sections", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      courseCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "courses",
          key: "code",
        },
        onDelete: "CASCADE",
      },
      day: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hour: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      place: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      instructorNo: {
        type: Sequelize.STRING(6),
        references: {
          model: "instructors",
          key: "instructorNo",
        },
        onDelete: "SET NULL",
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      noStudents: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("sections");
  },
};
