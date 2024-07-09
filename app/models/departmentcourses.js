module.exports = (sequelize, DataTypes) => {
  const DepartmentCourses = sequelize.define(
    "departmentcourses",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        validate: {
          isInt: { args: true, msg: "ID must be an integer" },
        },
      },
      departmentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "id",
        },
        onDelete: "CASCADE",
        validate: {
          isInt: { args: true, msg: "Department ID must be an integer" },
        },
      },
      courseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
        onDelete: "CASCADE",
        validate: {
          isInt: { args: true, msg: "Course ID must be an integer" },
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
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["departmentID", "courseID"],
          name: "unique_department_course",
        },
      ],
    }
  );
  return DepartmentCourses;
};
