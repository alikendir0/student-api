// models/sectionModel.js
module.exports = (sequelize, DataTypes) => {
  const Sections = sequelize.define("sections", {
    sectionID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    coursecode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "courses",
        key: "code",
      },
      onDelete: "CASCADE",
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructorno: {
      type: DataTypes.STRING(6),
      references: {
        model: "instructor",
        key: "instructorno",
      },
      onDelete: "SET NULL",
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nostudents: {
      type: DataTypes.INTEGER,
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
