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
      studentno: {
        type: DataTypes.STRING(11),
        allowNull: false,
        references: {
          model: "students",
          key: "studentno",
        },
        onDelete: "CASCADE",
      },
      sectionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sections",
          key: "sectionID",
        },
        onDelete: "CASCADE",
      },
      courseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
          key: "courseID",
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
          fields: ["studentno", "courseID"],
          name: "unique_student_course",
        },
      ],
    }
  );

  return studentCourses;
};
