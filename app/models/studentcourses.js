const validator = require("./validators.js");

module.exports = (sequelize, DataTypes) => {
  const studentCourses = sequelize.define(
    "studentcourses",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        validate: {
          isInt: { args: true, msg: "ID must be an integer" },
        },
      },
      studentNo: {
        type: DataTypes.STRING(11),
        allowNull: false,
        references: {
          model: "students",
          key: "studentNo",
        },
        onDelete: "CASCADE",
        validate: {
          isValidNo(value) {
            if (!validator.isValidNo(value)) {
              throw new Error("Invalid student number");
            }
          },
        },
      },
      sectionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sections",
          key: "id",
        },
        onDelete: "CASCADE",
        validate: {
          isInt: { args: true, msg: "Section ID must be an integer" },
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["studentNo", "sectionID"],
          name: "unique_student_course",
        },
      ],
    }
  );

  return studentCourses;
};
