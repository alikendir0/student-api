const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const { where } = require("sequelize");
const dbCourses = db.courses;
const dbFaculty = db.faculties;
const dbDepartmentCourses = db.departmentCourses;
const dbDepartments = db.departments;

const list = async () => {
  try {
    const data = await dbCourses.findAll({
      attributes: ["id", "code", "name", "description"],
      include: [
        {
          model: dbFaculty,
          attributes: ["id", "name"],
          as: "faculty",
        },
        {
          model: dbDepartmentCourses,
          required: false, // This will include courses without departments
          where: db.Sequelize.where(
            db.Sequelize.col("course-department.courseID"),
            db.Sequelize.col("courses.id")
          ),
          attributes: ["id", "period"],
          as: "course-department",
          include: [
            {
              model: dbDepartments,
              attributes: ["name", "id"],
              as: "department",
            },
          ],
        },
      ],
    });
    if (data) {
      const courses = data.map((course) => ({
        id: course.id,
        code: course.code,
        name: course.name,
        description: course.description,
        facultyName: course.faculty.name,
        facultyID: course.faculty.id,
        courseDepartments:
          course["course-department"].length > 0
            ? course["course-department"].map((dept) => ({
                id: dept.id,
                period: dept.period,
                departmentID: dept.department.id,
                departmentName: dept.department.name,
              }))
            : [],
      }));
      return new Response(ResponseStatus.SUCCESS, courses);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Courses not found"
      );
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};
const getFromName = async (id) => {
  try {
    const data = await dbCourses.findAll({
      where: { facultyID: id },
      attributes: ["code"],
    });
    if (data) {
      const courses = data.map((course) => course.dataValues);
      return new Response(ResponseStatus.SUCCESS, courses);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Courses not found"
      );
    }
  } catch (error) {
    console.error("Error fetching courses for faculty:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const get = async (id) => {
  try {
    const course = await dbCourses.findOne({ where: { id: id } });
    if (course) {
      return new Response(ResponseStatus.SUCCESS, course);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Course not found");
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const getFromCode = async (code) => {
  try {
    const course = await dbCourses.findOne({ where: { code: code } });
    if (course) {
      return new Response(ResponseStatus.SUCCESS, course);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Course not found");
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const del = async (id) => {
  try {
    const course = await dbCourses.findOne({ where: { id: id } });
    if (course) {
      await course.destroy();
      return new Response(ResponseStatus.SUCCESS, null);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Course not found");
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const save = async (data) => {
  console.log("Save course", data);
  try {
    const course = await dbCourses.create(data);
    if (course) {
      const courseDepartments = data.courseDepartments;
      for (const dept of courseDepartments) {
        await dbDepartmentCourses.create({
          courseID: course.id,
          departmentID: dept.departmentID,
          period: dept.period,
        });
      }

      // Fetch the updated course with courseDepartments
      const updatedCourse = await dbCourses.findOne({
        where: { id: course.id },
        include: [
          {
            model: dbFaculty,
            attributes: ["id", "name"],
            as: "faculty",
          },
          {
            model: dbDepartmentCourses,
            where: db.Sequelize.where(
              db.Sequelize.col("course-department.courseID"),
              db.Sequelize.col("courses.id")
            ),
            attributes: ["id", "period"],
            as: "course-department",
            include: [
              {
                model: dbDepartments,
                attributes: ["name"],
                as: "department",
              },
            ],
          },
        ],
      });

      const responseCourse = {
        id: updatedCourse.id,
        code: updatedCourse.code,
        name: updatedCourse.name,
        description: updatedCourse.description,
        facultyName: updatedCourse.faculty.name,
        facultyID: updatedCourse.faculty.id,
        courseDepartments: updatedCourse["course-department"].map((dept) => ({
          id: dept.id,
          period: dept.period,
          departmentName: dept.department.name,
        })),
      };

      return new Response(ResponseStatus.SUCCESS, responseCourse);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Unable to create");
    }
  } catch (error) {
    console.error("Error saving course:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};

const edit = async (id, data) => {
  console.log("Edit course", id, data);
  try {
    const course = await dbCourses.findByPk(id);
    if (course) {
      await course.update(data);
      const courseDepartments = data.courseDepartments;
      const departmentIDs = courseDepartments.map((dept) => dept.id);
      const existingDepartments = await dbDepartmentCourses.findAll({
        where: { courseID: id },
      });
      const currentDepartmentIDs = existingDepartments.map((dept) => dept.id);
      console.log("Current department courses", currentDepartmentIDs);
      console.log("New department courses", departmentIDs);

      for (const deptID of currentDepartmentIDs) {
        if (!departmentIDs.includes(deptID)) {
          console.log("Deleting department course", deptID);
          const departmentCourse = await dbDepartmentCourses.findByPk(deptID);
          await departmentCourse.destroy();
        }
      }

      for (const dept of courseDepartments) {
        if (!currentDepartmentIDs.includes(dept.id)) {
          console.log("Creating department course", dept);
          await dbDepartmentCourses.create({
            courseID: id,
            departmentID: dept.departmentID,
            period: dept.period,
          });
        } else {
          console.log("Updating department course", dept);
          const departmentCourse = await dbDepartmentCourses.findByPk(dept.id);
          await departmentCourse.update({
            departmentID: dept.departmentID,
            period: dept.period,
          });
        }
      }

      return new Response(ResponseStatus.SUCCESS, course);
    } else {
      return new Response(ResponseStatus.BAD_REQUEST, null, "Course not found");
    }
  } catch (error) {
    console.error("Error updating course:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const getCoursesDepartments = async (id) => {
  try {
    const data = await dbDepartments.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: dbDepartmentCourses,
          where: { courseID: id },
          attributes: ["period", "id"],
          as: "department-course",
        },
      ],
    });
    if (data) {
      const courses = data.map((course) => ({
        departmentID: course.dataValues.id,
        departmentName: course.dataValues.name,
        id: course.dataValues["department-course"][0].id,
        period: course.dataValues["department-course"][0].period,
      }));
      return new Response(ResponseStatus.SUCCESS, courses);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Courses not found"
      );
    }
  } catch (error) {
    console.error("Error fetching courses for department:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

module.exports = {
  list,
  getFromName,
  getFromCode,
  get,
  del,
  save,
  edit,
  getCoursesDepartments,
};
