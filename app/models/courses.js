const validator = require("./validators.js");

module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("courses", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      validate: {
        isInt: { args: true, msg: "ID must be an integer" },
      },
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "Code must only contain letters and numbers",
        },
        len: {
          args: [3, 8],
          msg: "Code must be between 3 and 8 characters",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 64],
          msg: "Name must be between 3 and 64 characters",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    facultyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "faculties",
        key: "id",
      },
      onDelete: "CASCADE",
      validate: {
        isInt: { args: true, msg: "Faculty ID must be an integer" },
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
  });
  return Courses;
};
