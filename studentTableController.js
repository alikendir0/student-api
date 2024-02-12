let studentTableContents = [
  {
    ad: "1",
    soyad: "Kendir",
    tcNo: "10000000146",
    ogrenciNo: "123456",
    dersler: ["HIST100", "LIT100"],
  },
  {
    ad: "2",
    soyad: "Kendir",
    tcNo: "99999999146",
    ogrenciNo: "123456",
    dersler: ["HIST100"],
  },
  {
    ad: "3",
    soyad: "Kendir",
    tcNo: "10000000146",
    ogrenciNo: "123456",
    dersler: ["HIST100"],
  },
  {
    ad: "4",
    soyad: "Kendir",
    tcNo: "10000000146",
    ogrenciNo: "654321",
    dersler: ["HIST100"],
  },
  {
    ad: "5",
    soyad: "Kendir",
    tcNo: "10000000146",
    ogrenciNo: "123456",
    dersler: ["HIST100"],
  },
  {
    ad: "6",
    soyad: "Kendir",
    tcNo: "99999999146",
    ogrenciNo: "123456",
    dersler: ["HIST100"],
  },
  {
    ad: "7",
    soyad: "Kendir",
    tcNo: "10000000146",
    ogrenciNo: "123456",
    dersler: ["HIST100"],
  },
  {
    ad: "8",
    soyad: "Kendir",
    tcNo: "10000000146",
    ogrenciNo: "654321",
    dersler: [],
  },
];

module.exports = function (app) {
  app.get("/studentTableContents", (req, res) => {
    res.send({ data: studentTableContents, size: studentTableContents.length });
  });

  app.get("/studentTableContents/:index", (req, res) => {
    const index = req.params.index;
    const student = studentTableContents[index];
    res.send({ dersler: student.dersler, length: student.dersler.length });
  });

  app.post("/studentTableContents", function (req, res) {
    var temp = credentialsCheck(
      req.body.ad,
      req.body.soyad,
      req.body.tcNo,
      req.body.ogrenciNo
    );
    if (temp === 1) {
      studentTableContents.push(req.body);
      res
        .status(200)
        .json({ message: "Data received successfully", code: temp });
    } else res.status(400).json({ message: "Invalid tcNo", code: temp });
  });

  app.post("/studentTableContents/:index", function (req, res) {
    res.status(200).json({ message: "Data received successfully" });
    const index = req.params.index;
    const student = studentTableContents[index];
    if (!student.dersler.includes(req.body.kod))
      student.dersler.push(req.body.kod);
  });

  app.delete("/studentTableContents/data/:index", (req, res) => {
    const index = req.params.index;
    studentTableContents.splice(index, 1);
    res.send({
      message: "Content deleted successfully",
    });
  });

  app.delete("/studentTableContents/data", (req, res) => {
    for (let i = 0; i < studentTableContents.length; i++) {
      studentTableContents[i].dersler = [];
    }
    res.send({
      message: "Content deleted successfully",
    });
  });
};

function credentialsCheck(ad, soyad, tcNo, ogrenciNo) {
  let temp = true;
  while (temp) {
    if (!(ad === null || ad === "")) {
      temp = false;
    } else {
      return 1;
    }
  }

  temp = true;
  while (temp) {
    if (!(soyad === null || soyad === "")) {
      temp = false;
    } else {
      return 2;
    }
  }

  temp = true;
  while (temp) {
    if (tcNoCheck(tcNo)) {
      temp = false;
    } else {
      return 3;
    }
  }

  temp = true;
  while (temp) {
    if (ogrenciNo.length === 6) {
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
