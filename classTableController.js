const fs = require("fs");

module.exports = function (app) {
  app.get("/classes/get", (req, res) => {
    const classTableContents = getFile();
    res.send({ data: classTableContents, size: classTableContents.length });
  });

  app.post("/classes/add", function (req, res) {
    addClass(req.body, res);
  });

  app.delete("/classes/delete/:index", (req, res) => {
    deleteClass(req.params.index, res);
  });
};

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

function addClass(data, res) {
  const temp = credentialsCheck(data);
  if (temp === 0) {
    const classTableContents = getFile();
    const { kod, fakulte, zaman, sinif, ogretici } = data;
    const newClass = { kod, fakulte, zaman, sinif, ogretici };
    classTableContents.push(newClass);
    saveFile(classTableContents);

    res.status(200).json({ message: "Data received successfully", code: temp });
  } else res.status(400).json({ message: "Invalid information.", code: temp });
}

function deleteClass(index, res) {
  const classTableContents = getFile();
  classTableContents.splice(index, 1);
  saveFile(classTableContents);
  res.send({
    message: "Content deleted successfully",
  });
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
