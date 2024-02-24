const fs = require("fs");

module.exports = function (app) {
  app.get("/classes/get", (req, res) => {
    const classTableContents = getFile();
    sendResponse(res, 200, 0, {
      table: classTableContents,
      size: classTableContents.length,
    });
  });

  app.post("/classes/add", function (req, res) {
    const code = addClass(req.body);
    if (code === 0) sendResponse(res, 201, code);
    else sendResponse(res, 400, code);
  });

  app.delete("/classes/delete/:index", (req, res) => {
    const code = deleteClass(req.params.index);
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
    const data = fs.readFileSync("classTableContents.json");
    return JSON.parse(data);
  } catch (error) {
    fs.writeFileSync("classTableContents.json", "[]");
    return [];
  }
}

function saveFile(data) {
  fs.writeFileSync("classTableContents.json", JSON.stringify(data, null, 2));
}

function createClass(Class) {
  const temp = credentialsCheck(Class);
  if (temp === 0) {
    const { kod, fakulte, zaman, sinif, ogretici } = Class;
    const newClass = { kod, fakulte, zaman, sinif, ogretici };
    return { code: temp, info: newClass };
  }
  return { code: temp };
}

function addClass(Class) {
  const newClass = createClass(Class);
  if (newClass.code === 0) {
    const classTableContents = getFile();
    classTableContents.push(newClass.info);
    saveFile(classTableContents);
    return newClass.code;
  } else return newClass.code;
}

function deleteClass(index) {
  const classTableContents = getFile();
  if (classTableContents.length > index) {
    classTableContents.splice(index, 1);
    saveFile(classTableContents);
    return 0;
  } else return 1;
}

function credentialsCheck(data) {
  if (data.kod === null || data.kod === "" || !(typeof data.kod === "string"))
    return 1;

  if (
    data.fakulte === null ||
    data.fakulte === "" ||
    !(typeof data.fakulte === "string")
  )
    return 2;

  if (
    data.zaman === null ||
    data.zaman === "" ||
    !(typeof data.zaman === "string")
  )
    return 3;

  if (
    data.sinif === null ||
    data.sinif === "" ||
    !(typeof data.sinif === "string")
  )
    return 4;

  if (
    data.ogretici === null ||
    data.ogretici === "" ||
    !(typeof data.ogretici === "string")
  )
    return 5;

  return 0;
}
