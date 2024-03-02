const { ValidationError } = require("./error");
const Base = require("./base");

class Student extends Base {
  constructor(name, lastName, idNo, studentNo, courses = []) {
    super();
    this.name = name;
    this.lastName = lastName;
    this.idNo = idNo;
    this.studentNo = studentNo;
    this.courses = courses;
  }

  static create(studentData) {
    const validation = this.validate(studentData);
    if (validation === true) {
      return new Student(
        studentData.name,
        studentData.lastName,
        studentData.idNo,
        studentData.studentNo,
        studentData.courses
      );
    }
    return validation;
  }

  assignCourse(code) {
    if (typeof code === "string" && !this.courses.includes(code)) {
      this.courses.push(code);
      return 0;
    } else if (this.courses.includes(code)) {
      return 1;
    } else {
      return 2;
    }
  }

  resetCourses() {
    this.courses = [];
  }

  static validate(data) {
    const errors = [];

    if (
      data.name === null ||
      data.name === "" ||
      !(typeof data.name === "string")
    ) {
      errors.push(new ValidationError("Name is not valid or empty", data.name));
    }

    if (
      data.lastName === null ||
      data.lastName === "" ||
      !(typeof data.lastName === "string")
    ) {
      errors.push(
        new ValidationError("Surname is not valid or empty", data.lastName)
      );
    }

    if (!this.idNoCheck(data.idNo)) {
      errors.push(new ValidationError("ID number is not valid", data.idNo));
    }

    if (data.studentNo && data.studentNo.length !== 6) {
      errors.push(
        new ValidationError("Student number is not valid", data.studentNo)
      );
    } else if (data.studentNo === null || data.studentNo === "") {
      errors.push(
        new ValidationError("Student number can't be empty", data.studentNo)
      );
    }

    if (data.courses && !data.courses instanceof Array) {
      errors.push(new ValidationError("Courses are not valid", data.courses));
    }

    if (errors.length > 0) {
      return errors;
    }

    return true;
  }

  static idNoCheck(idNo) {
    var temp = String(idNo).split("").map(Number);
    if (!/^\d{11}$/.test(idNo)) return false;

    let temp10 = 0;
    let temp11 = 0;
    for (let i = 0; i < temp.length; i++) {
      switch (i) {
        case 0:
          if (temp[i] == 0) {
            return false;
          }
          temp10 += temp[i];
          break;
        case 1:
          temp11 += temp[i];
          break;
        case 2:
          temp10 += temp[i];
          break;
        case 3:
          temp11 += temp[i];
          break;
        case 4:
          temp10 += temp[i];
          break;
        case 5:
          temp11 += temp[i];
          break;
        case 6:
          temp10 += temp[i];
          break;
        case 7:
          temp11 += temp[i];
          break;
        case 8:
          temp10 += temp[i];
          break;
        case 9:
          if (!((temp10 * 7 - temp11) % 10 == temp[i])) {
            return false;
          }
          temp11 += temp[i];
          break;
        case 10:
          if (!((temp10 + temp11) % 10 == temp[i])) {
            return false;
          }
          break;
      }
    }
    return true;
  }
}
module.exports = Student;
