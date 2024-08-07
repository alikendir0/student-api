const { on } = require("nodemon");

// models/sectionModel.js
module.exports = (sequelize, DataTypes) => {
  const Sections = sequelize.define("sections", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      validate: {
        isInt: { args: true, msg: "ID must be an integer" },
      },
    },
    courseCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "courses",
        key: "code",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
    instructorNo: {
      type: DataTypes.STRING(8),
      references: {
        model: "instructor",
        key: "instructorNo",
      },
      onDelete: "SET NULL",
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: "Capacity must be an integer" },
      },
    },
    noStudents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: "Number of students must be an integer" },
        async noStudentsLessThanCapacity(value) {
          const intValue = parseInt(value, 10);
          const intCapacity = parseInt(this.capacity, 10);
          if (intValue > intCapacity) {
            throw new Error("Number of students cannot exceed capacity");
          }
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
  return Sections;
};
