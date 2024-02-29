const Student = require("./Student");
const FileManager = require("./FileManager");
const fileManager = new FileManager();

module.exports = function (app) {
  app.get("/students/get", (req, res) => {
    const studentTableContents = fileManager.getFile();
    sendResponse(res, 200, 0, {
      table: studentTableContents,
      size: studentTableContents.length,
    });
  });

  app.get("/students/getclasses/:index", (req, res) => {
    const studentTableContents = fileManager.getFile();
    const student = studentTableContents[req.params.index];
    sendResponse(res, 201, 0, {
      dersler: student.dersler,
      length: student.dersler.length,
    });
  });

  app.post("/students/add", function (req, res) {
    const studentTableContents = fileManager.getFile();
    const newStudent = Student.create(req.body);
    if (typeof newStudent === "number") {
      sendResponse(res, 400, newStudent);
    } else {
      studentTableContents.push(newStudent);
      fileManager.saveFile(studentTableContents);
      sendResponse(res, 201, newStudent);
    }
  });

  app.post("/students/assign/:index", function (req, res) {
    const code = assignCourse(req.params.index, req.body);
    if (code === 0) sendResponse(res, 201, code);
    else if (code === 1) sendResponse(res, 409, code);
    else sendResponse(res, 400, code);
  });

  app.delete("/students/delete/:index", (req, res) => {
    const index = req.params.index;
    const studentTableContents = fileManager.getFile();
    if (studentTableContents.length > index) {
      studentTableContents.splice(index, 1);
      fileManager.saveFile(studentTableContents);
      sendResponse(res, 200, 0);
    } else sendResponse(res, 400, 1);
  });

  app.delete("/students/deassign", (req, res) => {
    const code = deleteClasses(req.body.indexes);
    if (code === 0) sendResponse(res, 200, code);
    else sendResponse(res, 400, code);
  });
};

function assignCourse(index, data) {
  const studentTableContents = fileManager.getFile();
  const newStudent = Student.create(studentTableContents[index]);
  const code = newStudent.assignCourse(data.kod);
  studentTableContents[index] = newStudent;
  fileManager.saveFile(studentTableContents);
  return code;
}

function deleteClasses(indexes) {
  const studentTableContents = fileManager.getFile();
  if (indexes && typeof indexes === "object" && indexes.length > 0) {
    for (let i = 0; i < indexes.length; i++) {
      const newStudent = Student.create(studentTableContents[indexes[i] - 1]);
      newStudent.resetCourses();
      studentTableContents[indexes[i] - 1] = newStudent;
    }
    fileManager.saveFile(studentTableContents);
    return 0;
  } else return 1;
}

function sendResponse(res, statusCode, code, data = {}) {
  switch (statusCode) {
    case 200:
      res.status(statusCode).json({ code: code, d: data, message: "OK" });
      break;
    case 201:
      res.status(statusCode).json({ code: code, d: data, message: "Created" });
      break;
    case 400:
      res
        .status(statusCode)
        .json({ code: code, d: data, message: "Bad Request" });
      break;
    case 409:
      res.status(statusCode).json({ code: code, d: data, message: "Conflict" });
      break;
    default:
      res
        .status(500)
        .json({ code: code, d: data, message: "Internal Server Error" });
  }
}
