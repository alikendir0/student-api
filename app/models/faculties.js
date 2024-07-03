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
        isAlpha: {
          args: true,
          msg: "Name must only contain letters",
        },
        len: {
          args: [3, 32],
          msg: "Name must be between 3 and 32 characters",
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
