module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define("students", {
    idNo: {
      unique: true,
      type: DataTypes.STRING(11),
    },
    studentno: {
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
