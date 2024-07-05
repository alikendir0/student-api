"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("studentsections", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentNo: {
        type: Sequelize.STRING(11),
        allowNull: false,
        references: {
          model: "students",
          key: "studentNo",
        },
        onDelete: "CASCADE",
      },
      sectionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sections",
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

    await queryInterface.addConstraint("studentsections", {
      fields: ["studentNo", "sectionID"],
      type: "unique",
      name: "unique_student_course",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("studentsections");
  },
};
