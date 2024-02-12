const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const studentTableController = require("./studentTableController");
const classTableController = require("./classTableController");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

studentTableController(app);
classTableController(app);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

app.get("/tableContents", (req, res) => {
  res.send(tableContents);
});
