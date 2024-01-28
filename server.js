const express = require("express");
const { request } = require("http");

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let tableContents = [
  ["", "Ad", "Soyad", "T.C. Kimlik Numarasi", " Öğrenci Numarası", ""],
  [
    '<input class="Checkbox" type="checkbox">',
    "Ali",
    "Kendir",
    "10000000146",
    "123456",
    '<button class="ders-button">Dersler</button>',
  ],
  [
    '<input class="Checkbox" type="checkbox">',
    "Alp",
    "Kendir",
    "10000000146",
    "123456",
    '<button class="ders-button">Dersler</button>',
  ],
  [
    '<input class="Checkbox" type="checkbox">',
    "Alp",
    "Kendir",
    "10000000146",
    "123456",
    '<button class="ders-button">Dersler</button>',
  ],
];
app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));

app.get("/tableContents", (req, res) => {
  res.send(tableContents);
});

// app.post("/tableContents", (req, res) => {
//   tableContents.push(req.body);
//   res.sendStatus(201);
// });
