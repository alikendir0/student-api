let classTableContents = [
  {
    kod: "1",
    fakulte: "Kendir",
    zaman: "10.40",
    sinif: "A176",
    ogretici: "Kendir2",
  },
  {
    kod: "2",
    fakulte: "Kendir",
    zaman: "10.40",
    sinif: "A176",
    ogretici: "Kendir2",
  },
  {
    kod: "3",
    fakulte: "Kendir",
    zaman: "10.40",
    sinif: "A176",
    ogretici: "Kendir2",
  },
  {
    kod: "4",
    fakulte: "Kendir",
    zaman: "10.40",
    sinif: "A176",
    ogretici: "Kendir2",
  },
];

module.exports = function (app) {
  app.get("/classTableContents", (req, res) => {
    res.send({ data: classTableContents, size: classTableContents.length });
  });

  app.post("/classTableContents", function (req, res) {
    if (
      credentialsCheck(
        req.body.kod,
        req.body.fakulte,
        req.body.zaman,
        req.body.sinif,
        req.body.ogretici
      )
    ) {
      classTableContents.push(req.body);
      res.status(200).json({ message: "Data received successfully", code: 1 });
    } else {
      res.status(400).json({ message: "Invalid Information", code: 0 });
    }
  });

  app.delete("/classTableContents/data/:id", (req, res) => {
    const id = req.params.id;
    classTableContents.splice(id, 1);
    res.send({
      message: "Content deleted successfully",
    });
  });
};

function credentialsCheck(kod, fakulte, zaman, sinif, ogretici) {
  let temp = true;
  while (temp) {
    if (!(kod === null || kod === "")) {
      temp = false;
    } else {
      return false;
    }
  }

  temp = true;

  while (temp) {
    if (!(fakulte === null || fakulte === "")) {
      temp = false;
    } else {
      return false;
    }
  }

  temp = true;

  while (temp) {
    if (!(zaman === null || zaman === "")) {
      temp = false;
    } else {
      return false;
    }
  }

  temp = true;

  while (temp) {
    if (!(sinif === null || sinif === "")) {
      temp = false;
    } else {
      return false;
    }
  }

  temp = true;

  while (temp) {
    if (!(ogretici === null || ogretici === "")) {
      temp = false;
    } else {
      return false;
    }
  }
  return true;
}
