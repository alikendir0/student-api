const { ValidationError } = require("./error");
const Base = require("./base");

class Course extends Base {
  constructor(code, faculty, time, place, instructor) {
    super();
    this.code = code;
    this.faculty = faculty;
    this.time = time;
    this.place = place;
    this.instructor = instructor;
  }

  static create(courseData) {
    const validation = this.validate(courseData);
    if (validation === true) {
      return new Course(
        courseData.code,
        courseData.faculty,
        courseData.time,
        courseData.place,
        courseData.instructor
      );
    }
    return validation;
  }

  static validate(data) {
    const errors = [];

    if (
      data.code === null ||
      data.code === "" ||
      !(typeof data.code === "string")
    ) {
      errors.push(new ValidationError("Code is not valid or empty", data.code));
    }

    if (
      data.faculty === null ||
      data.faculty === "" ||
      !(typeof data.faculty === "string")
    ) {
      errors.push(
        new ValidationError("Faculty is not valid or empty", data.faculty)
      );
    }

    if (
      data.time === null ||
      data.time === "" ||
      !(typeof data.time === "string")
    ) {
      errors.push(new ValidationError("Time is not valid or empty", data.time));
    }

    if (
      data.place === null ||
      data.place === "" ||
      !(typeof data.place === "string")
    ) {
      errors.push(
        new ValidationError("place is not valid or empty", data.place)
      );
    }
    if (
      data.instructor === null ||
      data.instructor === "" ||
      !(typeof data.instructor === "string")
    ) {
      errors.push(
        new ValidationError("Instructor is not valid or empty", data.instructor)
      );
    }

    if (errors.length > 0) {
      return errors;
    }

    return true;
  }
}
module.exports = Course;
