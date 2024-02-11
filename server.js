const express = require("express");

const tableController = require("./tableController");

const app = express();
const PORT = 3000;

tableController(app);

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

app.get("/tableContents", (req, res) => {
  res.send(tableContents);
});
