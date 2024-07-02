const models = require(".");

module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("courses", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    facultyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "faculties",
        key: "id",
      },
      onDelete: "CASCADE",
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
