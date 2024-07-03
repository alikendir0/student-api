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
      type: DataTypes.STRING(6),
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
