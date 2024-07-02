const { ValidationError } = require("./error");

class Student {
  constructor(firstName, lastName, id, studentNo) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.studentNo = studentNo;
  }

  static create(studentData) {
    const validation = this.validate(studentData);
    if (validation === true) {
      return new Student(
        studentData.firstName,
        studentData.lastName,
        studentData.id,
        studentData.studentNo
      );
    }
    return validation;
  }

  static validate(data) {
    const errors = [];

    if (
      data.firstName === null ||
      data.firstName === "" ||
      !(typeof data.firstName === "string")
    ) {
      errors.push(
        new ValidationError("Name is not valid or empty", data.firstName)
      );
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

    if (!this.idCheck(data.id)) {
      errors.push(new ValidationError("ID number is not valid", data.id));
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

    if (errors.length > 0) {
      return errors;
    }

    return true;
  }

  static idCheck(id) {
    var temp = String(id).split("").map(Number);
    if (!/^\d{11}$/.test(id)) return false;

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
