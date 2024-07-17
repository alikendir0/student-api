const validator = require("./validators.js");

module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define("students", {
    id: {
      unique: true,
      type: DataTypes.STRING(11),
      validate: {
        isValidId(value) {
          if (!validator.isValidId(value)) {
            throw new Error("Invalid ID");
          }
        },
      },
    },
    studentNo: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING(8),
      validate: {
        isValidNo(value) {
          if (!validator.isValidNo(value)) {
            throw new Error("Invalid student number");
          }
        },
      },
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: "First name must only contain letters",
        },
        len: {
          args: [3, 32],
          msg: "First name must be between 2 and 32 characters",
        },
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: "Last name must only contain letters",
        },
        len: {
          args: [3, 32],
          msg: "Last name must be between 2 and 32 characters",
        },
      },
    },
    gender: {
      allowNull: false,
      type: DataTypes.ENUM("M", "F", "O"),
      validate: {
        isIn: {
          args: [["M", "F", "O"]],
          msg: "Gender must be M, F, or O",
        },
      },
    },
    departmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "departments",
        key: "id",
      },
      onDelete: "CASCADE",
      validate: {
        isInt: { args: true, msg: "Department ID must be an integer" },
      },
    },

    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: "Period must be an integer" },
        min: { args: 1, msg: "Period must be greater than or equal to 1" },
        max: { args: 8, msg: "Period must be less than or equal to 8" },
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
  return Students;
};
