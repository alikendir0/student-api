"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("studentcourses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentno: {
        type: Sequelize.STRING(11),
        allowNull: false,
        references: {
          model: "students",
          key: "studentno",
        },
        onDelete: "CASCADE",
      },
      sectionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sections",
          key: "sectionID",
        },
        onDelete: "CASCADE",
      },
      courseID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
          key: "courseID",
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

    await queryInterface.addConstraint("studentcourses", {
      fields: ["studentno", "courseID"],
      type: "unique",
      name: "unique_student_course",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("studentcourses");
  },
};
