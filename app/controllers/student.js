const { response } = require("express");

module.exports = function (app) {
  const studentService = require("../services/student");

  app.get("/students", async (req, res) => {
    try {
      const response = await studentService.list();
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/student", async function (req, res) {
    try {
      const response = await studentService.save(req.body);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.delete("/student/:id", async (req, res) => {
    try {
      const response = await studentService.del(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/student/courses/:id", async (req, res) => {
    try {
      const response = await studentService.getCourses(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/student/add/course/:id", async (req, res) => {
    try {
      const response = await studentService.assign(
        req.params.id,
        req.body.courses
      );
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.delete("/students/delete/courses", async (req, res) => {
    try {
      const response = await studentService.reset(req.body.ids);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.delete("/student/delete/course/:id/:code", async (req, res) => {
    try {
      const response = await studentService.deassign(
        req.params.id,
        req.params.code
      );
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  console.log("Student controller initialized...");
};
