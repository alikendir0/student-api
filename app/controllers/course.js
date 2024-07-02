module.exports = function (app) {
  const courseService = require("../services/course");

  app.get("/courses", async (req, res) => {
    try {
      const response = await courseService.list();
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/course", async (req, res) => {
    try {
      const response = await courseService.save(req.body);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.delete("/course/:id", async (req, res) => {
    try {
      const response = await courseService.del(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/course/:id", async (req, res) => {
    try {
      const response = await courseService.get(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  console.log("Course controller initialized...");
};
