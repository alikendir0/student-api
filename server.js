const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const controllers = require("./app/controllers");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


for (const controller in controllers) {
  controllers[controller](app);
}

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
