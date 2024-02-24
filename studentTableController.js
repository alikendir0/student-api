const fs = require("fs");

module.exports = function (app) {
  app.get("/students/get", (req, res) => {
    const studentTableContents = getFile();
    sendResponse(res, 200, 0, {
      table: studentTableContents,
      size: studentTableContents.length,
    });
  });

  app.get("/students/getclasses/:index", (req, res) => {
    const studentTableContents = getFile();
    const student = studentTableContents[req.params.index];
    sendResponse(res, 201, 0, {
      dersler: student.dersler,
      length: student.dersler.length,
    });
  });

  app.post("/students/add", function (req, res) {
    const code = addStudent(req.body);
    if (code === 0) sendResponse(res, 201, code);
    else sendResponse(res, 400, code);
  });

  app.post("/students/assign/:index", function (req, res) {
    const code = addClass(req.params.index, req.body);
    if (code === 0) sendResponse(res, 201, code);
    else if (code === 1) sendResponse(res, 409, code);
    else sendResponse(res, 400, code);
  });

  app.delete("/students/delete/:index", (req, res) => {
    const code = deleteStudent(req.params.index);
    if (code === 0) sendResponse(res, 200, code);
    else sendResponse(res, 400, code);
  });

  app.delete("/students/deassign", (req, res) => {
    const code = deleteClasses(req.body.indexes, res);
    if (code === 0) sendResponse(res, 200, code);
    else sendResponse(res, 400, code);
  });
};

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

function getFile() {
  try {
    const data = fs.readFileSync("studentTableContents.json");
    return JSON.parse(data);
  } catch (error) {
    fs.writeFileSync("studentTableContents.json", "[]");
    return [];
  }
}

function saveFile(data) {
  fs.writeFileSync("studentTableContents.json", JSON.stringify(data, null, 2));
}

function createStudent(student) {
  const temp = credentialsCheck(student);
  if (temp === 0) {
    const { ad, soyad, tcNo, ogrenciNo, dersler = [] } = student;
    const newStudent = {
      ad,
      soyad,
      tcNo,
      ogrenciNo,
      dersler,
    };
    return { code: temp, info: newStudent };
  }
  return { code: temp };
}

function addStudent(student) {
  const newStudent = createStudent(student);
  if (newStudent.code === 0) {
    const studentTableContents = getFile();
    studentTableContents.push(newStudent.info);
    saveFile(studentTableContents);
    return newStudent.code;
  } else return newStudent.code;
}

function deleteStudent(index) {
  const studentTableContents = getFile();
  if (studentTableContents.length > index) {
    studentTableContents.splice(index, 1);
    saveFile(studentTableContents);
    return 0;
  } else return 1;
}

function addClass(index, data) {
  const studentTableContents = getFile();
  var dersler = studentTableContents[index].dersler;
  if (typeof data.kod === "string" && !dersler.includes(data.kod)) {
    dersler.push(data.kod);
    saveFile(studentTableContents);
    return 0;
  } else if (dersler.includes(data.kod)) return 1;
  else return 2;
}

function deleteClasses(indexes, res) {
  const studentTableContents = getFile();
  if (indexes && typeof indexes === "object" && indexes.length > 0) {
    for (let i = 0; i < indexes.length; i++) {
      studentTableContents[indexes[i] - 1].dersler = [];
    }
    saveFile(studentTableContents);
    return 0;
  } else return 1;
}

function credentialsCheck(data) {
  if (data.ad === null || data.ad === "" || !(typeof data.ad === "string"))
    return 1;

  if (
    data.soyad === null ||
    data.soyad === "" ||
    !(typeof data.soyad === "string")
  )
    return 2;

  if (!tcNoCheck(data.tcNo)) return 3;

  if (!(data.ogrenciNo.length === 6)) return 4;

  if (!(typeof data.dersler === "object")) {
    console.log(typeof data.dersler);
    return 5;
  }
  return 0;
}

function tcNoCheck(tcNo) {
  var temp = String(tcNo).split("").map(Number);
  if (!/^\d{11}$/.test(tcNo)) return false;

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
