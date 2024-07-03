module.exports = (sequelize, DataTypes) => {
  const Faculties = sequelize.define("faculties", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      validate: {
        isInt: { args: true, msg: "ID must be an integer" },
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  return Faculties;
};
