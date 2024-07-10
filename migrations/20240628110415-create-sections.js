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
        onUpdate: "CASCADE",
      },
      day: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hour: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      instructorNo: {
        type: Sequelize.STRING(8),
        references: {
          model: "instructors",
          key: "instructorNo",
        },
        onDelete: "SET NULL",
      },
      roomNo: {
        type: Sequelize.STRING,
        references: {
          model: "rooms",
          key: "code",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
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
