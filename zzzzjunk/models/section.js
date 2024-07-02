const { ValidationError } = require("./error");

class Section {
  constructor(
    courseCode,
    faculty,
    hour,
    day,
    place,
    instructor,
    capacity,
    noStudents
  ) {
    this.courseCode = courseCode;
    this.faculty = faculty;
    this.hour = hour;
    this.day = day;
    this.place = place;
    this.capacity = capacity;
    this.noStudents = noStudents;
    this.instructor = instructor;
  }

  static create(sectionData) {
    const validation = this.validate(sectionData);
    if (validation === true) {
      return new Section(
        sectionData.courseCode,
        sectionData.faculty,
        sectionData.hour,
        sectionData.day,
        sectionData.place,
        sectionData.capacity,
        sectionData.noStudents,
        sectionData.instructor
      );
    }
    return validation;
  }

  static validate(data) {
    const errors = [];
    if (
      data.courseCode === null ||
      data.courseCode === "" ||
      !(typeof data.courseCode === "string")
    ) {
      errors.push(
        new ValidationError(
          "Section code is not valid or empty",
          data.courseCode
        )
      );
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
      data.hour === null ||
      data.hour === "" ||
      !(typeof data.hour === "string")
    ) {
      errors.push(new ValidationError("Hour is not valid or empty", data.hour));
    }
    if (
      data.day === null ||
      data.day === "" ||
      !(typeof data.day === "string")
    ) {
      errors.push(new ValidationError("Day is not valid or empty", data.day));
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
      data.capacity === null ||
      data.capacity === "" ||
      !(typeof data.capacity === "number")
    ) {
      errors.push(
        new ValidationError("Capacity is not valid or empty", data.capacity)
      );
    }
    if (
      data.noStudents === null ||
      data.noStudents === "" ||
      !(typeof data.noStudents === "number")
    ) {
      errors.push(
        new ValidationError(
          "Number of students is not valid or empty",
          data.noStudents
        )
      );
    }

    if (data.noStudents > data.capacity) {
      errors.push(
        new ValidationError(
          "Number of students is greater than capacity",
          data.noStudents
        )
      );
    }

    if (
      data.instructor.firstName === null ||
      data.instructor.firstName === "" ||
      !(typeof data.instructor.firstName === "string")
    ) {
      errors.push(
        new ValidationError(
          "Instructor firstname is not valid or empty",
          data.instructor.firstName
        )
      );
    }

    if (
      data.instructor.lastName === null ||
      data.instructor.lastName === "" ||
      !(typeof data.instructor.lastName === "string")
    ) {
      errors.push(
        new ValidationError(
          "Instructor lastname is not valid or empty",
          data.instructor.lastName
        )
      );
    }

    if (errors.length > 0) {
      return errors;
    }

    return true;
  }
}
module.exports = Section;
