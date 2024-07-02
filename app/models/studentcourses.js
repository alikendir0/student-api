module.exports = (sequelize, DataTypes) => {
  const studentCourses = sequelize.define(
    "studentcourses",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      studentNo: {
        type: DataTypes.STRING(11),
        allowNull: false,
        references: {
          model: "students",
          key: "studentNo",
        },
        onDelete: "CASCADE",
      },
      sectionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sections",
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
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["studentNo", "sectionID"],
          name: "unique_student_course",
        },
      ],
    }
  );

  return studentCourses;
};
