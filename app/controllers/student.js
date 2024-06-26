module.exports = function (app) {
  const studentService = require("../services/student");

  app.get("/students", (req, res) => {
    const response = studentService.list();
    res.status(response.status).json(response);
  });

  app.post("/student", function (req, res) {
    const response = studentService.save(req.body);
    res.status(response.status).json(response);
  });

  app.delete("/student/:id", (req, res) => {
    const response = studentService.del(req.params.id);
    res.status(response.status).json(response);
  });

  app.get("/student/courses/:id", (req, res) => {
    const response = studentService.getCourses(req.params.id);
    res.status(response.status).json(response);
  });

  app.post("/student/add/course/:id", function (req, res) {
    const response = studentService.assign(req.params.id, req.body.courses);
    res.status(response.status).json(response);
  });

  app.delete("/students/delete/courses", (req, res) => {
    const response = studentService.reset(req.body.ids);
    res.status(response.status).json(response);
  });

  app.delete("/student/delete/course/:id/:code", (req, res) => {
    const response = studentService.deassign(req.params.id, req.params.code);
    res.status(response.status).json(response);
  });

  console.log("Student controller initialized...");
};
