const validator = require("./validators.js");

module.exports = (sequelize, DataTypes) => {
  const sectionSessions = sequelize.define(
    "sectionsessions",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sectionID: {
        type: DataTypes.INTEGER,
        references: {
          model: "sections",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      day: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["M", "T", "W", "TH", "F"]],
            msg: "Day must be M, T, W, TH, or F",
          },
        },
      },
      hour: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: [/^\d{2}:\d{2}-\d{2}:\d{2}$/],
            msg: "Hour must be in the format HH:MM-HH:MM",
          },
        },
      },
      roomNo: {
        type: DataTypes.STRING,
        references: {
          model: "rooms",
          key: "code",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["sectionID", "day", "hour"],
          name: "unique_section_session",
        },
      ],
    }
  );

  return sectionSessions;
};
