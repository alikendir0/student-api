module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define("students", {
    id: {
      unique: true,
      type: DataTypes.STRING(11),
    },
    studentNo: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING(6),
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
  return Students;
};
