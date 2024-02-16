const fs = require("fs");

module.exports = function (app) {
  app.get("/classTableContents", (req, res) => {
    const classTableContents = getFile();
    res.send({ data: classTableContents, size: classTableContents.length });
  });

  app.post("/classTableContents", function (req, res) {
    addClass(req.body, res);
  });

  app.delete("/classTableContents/data/:index", (req, res) => {
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
    classTableContents.push(data);
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
  let temp = true;
  while (temp) {
    if (!(data.kod === null || data.kod === "")) {
      temp = false;
    } else {
      return 1;
    }
  }

  temp = true;

  while (temp) {
    if (!(data.fakulte === null || data.fakulte === "")) {
      temp = false;
    } else {
      return 2;
    }
  }

  temp = true;

  while (temp) {
    if (!(data.zaman === null || data.zaman === "")) {
      temp = false;
    } else {
      return 3;
    }
  }

  temp = true;

  while (temp) {
    if (!(data.sinif === null || data.sinif === "")) {
      temp = false;
    } else {
      return 4;
    }
  }

  temp = true;

  while (temp) {
    if (!(data.ogretici === null || data.ogretici === "")) {
      temp = false;
    } else {
      return 5;
    }
  }
  return 0;
}
