module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define("instructors", {
    id: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(11),
    },
    instructorNo: {
      allowNull: false,
      type: DataTypes.STRING(6),
      primaryKey: true,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
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
