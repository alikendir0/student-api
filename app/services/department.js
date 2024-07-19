const { Response, ResponseStatus } = require("../models/response");
const db = require("../managers");
const dbDepartments = db.departments;
const dbFaculty = db.faculties;
const dbCourses = db.courses;
const dbDepartmentCourses = db.departmentCourses;

const list = async () => {
  try {
    const data = await dbDepartments.findAll({
      attributes: ["id", "name", "abbreviation", "facultyID"],
      include: [
        {
          model: dbFaculty,
          attributes: ["name"],
          as: "faculty",
        },
      ],
      order: [["name", "ASC"]],
    });
    if (data) {
      const departments = data.map((department) => ({
        id: department.id,
        name: department.name,
        abbreviation: department.abbreviation,
        facultyID: department.facultyID,
        facultyName: department.faculty.name,
      }));
      return new Response(ResponseStatus.SUCCESS, departments);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Departments not found"
      );
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const save = async (data) => {
  try {
    const department = await dbDepartments.create(data);
    return new Response(ResponseStatus.SUCCESS, department);
  } catch (error) {
    console.error("Error saving department:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const del = async (id) => {
  try {
    const department = await dbDepartments.findOne({ where: { id } });
    if (department) {
      await department.destroy();
      return new Response(ResponseStatus.SUCCESS, null);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Department not found"
      );
    }
  } catch (error) {
    console.error("Error deleting department:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const edit = async (id, data) => {
  try {
    const department = await dbDepartments.findOne({ where: { id } });
    if (department) {
      await department.update(data);
      return new Response(ResponseStatus.SUCCESS, department);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Department not found"
      );
    }
  } catch (error) {
    console.error("Error updating department:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const get = async (id) => {
  try {
    const department = await dbDepartments.findOne({
      where: { id },
      include: [
        {
          model: dbFaculty,
          attributes: ["name"],
          as: "faculty",
        },
      ],
    });
    if (department) {
      return new Response(ResponseStatus.SUCCESS, department);
    } else {
      return new Response(
        ResponseStatus.BAD_REQUEST,
        null,
        "Department not found"
      );
    }
  } catch (error) {
    console.error("Error fetching department:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

const getCirriculum = async (id) => {
  try {
    const data = await dbDepartmentCourses.findAll({
      where: { departmentID: id },
      attributes: ["period", "id"],
      include: [
        {
          model: dbDepartments,
          attributes: ["id", "name"],
          as: "departments",
        },
        {
          model: dbCourses,
          attributes: ["id", "code", "name"],
          as: "courses",
        },
      ],
    });
    return new Response(ResponseStatus.SUCCESS, data);
  } catch (error) {
    console.error("Error fetching cirriculum:", error);
    return new Response(
      ResponseStatus.INTERNAL_SERVER_ERROR,
      null,
      "An error occurred"
    );
  }
};

module.exports = {
  list,
  save,
  del,
  edit,
  get,
  getCirriculum,
};
