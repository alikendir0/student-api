var bodyParser = require("body-parser");

let tableContents = [
  { ad: "1", soyad: "Kendir", tcNo: "10000000146", ogrenciNo: "123456" },
  { ad: "2", soyad: "Kendir", tcNo: "99999999146", ogrenciNo: "123456" },
  { ad: "3", soyad: "Kendir", tcNo: "10000000146", ogrenciNo: "123456" },
  { ad: "4", soyad: "Kendir", tcNo: "10000000146", ogrenciNo: "654321" },
];

module.exports = function (app) {
  //regulation
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  //regulation

  app.get("/tableContents", (req, res) => {
    res.send({ data: tableContents, size: tableContents.length });
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/tableContents", function (req, res) {
    tableContents.push(req.body);
    res.status(200).json({ message: "Data received successfully" });
  });

  // app.delete("/todo/:item", function (req, res) {
  //   data = data.filter(function (todo) {
  //     return todo.item.replace(/ /g, "-") !== req.params.item;
  //   });
  //   res.json(data);
  // });
};
