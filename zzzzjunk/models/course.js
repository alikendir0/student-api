class Course {
  constructor(id, code, facultyID) {
    this.id = id;
    this.code = code;
    this.facultyID = facultyID;
  }
  static create(courseData) {
    const validation = this.validate(courseData);
    if (validation === true) {
      return new Course(courseData.id, courseData.code, courseData.facultyID);
    }
    return validation;
  }
  static validate(data) {
    const errors = [];
    if (data.id === null || data.id === "" || !(typeof data.id === "string")) {
      errors.push(new ValidationError("ID is not valid or empty", data.id));
    }
    if (
      data.code === null ||
      data.code === "" ||
      !(typeof data.code === "string")
    ) {
      errors.push(new ValidationError("Code is not valid or empty", data.code));
    }
    if (
      data.facultyID === null ||
      data.facultyID === "" ||
      !(typeof data.facultyID === "string")
    ) {
      errors.push(
        new ValidationError("Faculty ID is not valid or empty", data.facultyID)
      );
    }
    if (errors.length > 0) {
      return errors;
    }
    return true;
  }
}

module.exports = Course;
