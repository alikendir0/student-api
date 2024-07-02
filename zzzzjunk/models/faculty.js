const { ValidationError } = require("./error");

class Faculty {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  static create(facultyData) {
    const validation = this.validate(facultyData);
    if (validation === true) {
      return new Faculty(facultyData.id, facultyData.name);
    }
    return validation;
  }
  static validate(data) {
    const errors = [];
    if (data.id === null || data.id === "" || !(typeof data.id === "string")) {
      errors.push(new ValidationError("ID is not valid or empty", data.id));
    }
    if (
      data.name === null ||
      data.name === "" ||
      !(typeof data.name === "string")
    ) {
      errors.push(new ValidationError("Name is not valid or empty", data.name));
    }
    if (errors.length > 0) {
      return errors;
    }
    return true;
  }
}

module.exports = Faculty;
