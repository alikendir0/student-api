module.exports = function (app) {
  const facultyService = require("../services/faculty");

  app.get("/faculties", async (req, res) => {
    try {
      const response = await facultyService.list();
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/faculty", async (req, res) => {
    try {
      const response = await facultyService.save(req.body);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.delete("/faculty/:id", async (req, res) => {
    try {
      const response = await facultyService.del(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/faculty/:id", async (req, res) => {
    try {
      const response = await facultyService.get(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
