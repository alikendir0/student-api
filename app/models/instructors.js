const validator = require("./validators.js");

module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define("instructors", {
    id: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(11),
      validate: {
        isValidId(value) {
          if (!validator.isValidId(value)) {
            throw new Error("Invalid ID");
          }
        },
      },
    },
    instructorNo: {
      allowNull: false,
      type: DataTypes.STRING(8),
      primaryKey: true,
      validate: {
        isValidNo(value) {
          if (!validator.isValidNo(value)) {
            throw new Error("Invalid instructor number");
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
          msg: "First name must be between 3 and 32 characters",
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
    facultyID: {
      allowNull: false,
      type: DataTypes.INTEGER,
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

  return Instructor;
};
