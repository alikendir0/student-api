const validator = require("./validators.js");

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define("rooms", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      validate: {
        isInt: { args: true, msg: "ID must be an integer" },
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^[ABDFGH]-\d{3}$/i,
          msg: "Code must be in the format of [ABDFGH]-[3 digits]",
        },
      },
    },
    recommendedCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: "Recommended capacity must be an integer" },
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
  return Room;
};
