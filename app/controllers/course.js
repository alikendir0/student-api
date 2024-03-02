module.exports = function (app) {
  const courseService = require("../services/course");

  app.get("/courses", (req, res) => {
    const response = courseService.list();
    res.status(response.status).json(response);
  });

  app.post("/course", function (req, res) {
    const response = courseService.save(req.body);
    res.status(response.status).json(response);
  });

  app.delete("/course/:id", (req, res) => {
    const response = courseService.del(req.params.id);
    res.status(response.status).json(response);
  });

  app.get("/course/:id", (req, res) => {
    const response = courseService.get(req.params.id);
    res.status(response.status).json(response);
  });
  console.log("Course controller initialized...");
};
