const fs = require("fs");

module.exports = function (app) {
  app.get("/studentTableContents", (req, res) => {
    const studentTableContents = getFile();
    res.send({ data: studentTableContents, size: studentTableContents.length });
  });

  app.get("/studentTableContents/:index", (req, res) => {
    const studentTableContents = getFile();
    const index = req.params.index;
    const student = studentTableContents[index];
    res.send({ dersler: student.dersler, length: student.dersler.length });
  });

  app.post("/studentTableContents", function (req, res) {
    addStudent(req.body, res);
  });

  app.post("/studentTableContents/:index", function (req, res) {
    addClass(req.params.index, req.body, res);
  });

  app.delete("/studentTableContents/data/:index", (req, res) => {
    deleteStudent(req.params.index, res);
  });

  app.delete("/studentTableContents/data", (req, res) => {
    deleteClasses(res);
  });
};

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

function addStudent(data, res) {
  const temp = credentialsCheck(data);
  if (temp === 0) {
    const studentTableContents = getFile();
    studentTableContents.push(data);
    saveFile(studentTableContents);

    res.status(200).json({ message: "Data received successfully", code: temp });
  } else res.status(400).json({ message: "Invalid information.", code: temp });
}

function deleteStudent(index, res) {
  const studentTableContents = getFile();
  studentTableContents.splice(index, 1);
  saveFile(studentTableContents);
  res.send({
    message: "Content deleted successfully",
  });
}

function addClass(index, data, res) {
  const studentTableContents = getFile();
  var dersler = studentTableContents[index].dersler;
  if (!dersler.includes(data.kod)) {
    dersler.push(data.kod);
    saveFile(studentTableContents);
    res.status(200).json({ message: "Data received successfully" });
  } else res.status(409).json({ message: "Data already exists" });
}

function deleteClasses(res) {
  const studentTableContents = getFile();
  for (let i = 0; i < studentTableContents.length; i++) {
    studentTableContents[i].dersler = [];
  }
  saveFile(studentTableContents);
  res.send({
    message: "Content deleted successfully",
  });
}

function credentialsCheck(data) {
  let temp = true;
  while (temp) {
    if (!(data.ad === null || data.ad === "")) {
      temp = false;
    } else {
      return 1;
    }
  }

  temp = true;
  while (temp) {
    if (!(data.soyad === null || data.soyad === "")) {
      temp = false;
    } else {
      return 2;
    }
  }

  temp = true;
  while (temp) {
    if (tcNoCheck(data.tcNo)) {
      temp = false;
    } else {
      return 3;
    }
  }

  temp = true;
  while (temp) {
    if (data.ogrenciNo.length === 6) {
      temp = false;
    } else {
      return 4;
    }
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
