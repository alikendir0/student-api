module.exports = function (app) {
  const instructorService = require("../services/instructor");

  app.get("/instructors", async (req, res) => {
    try {
      const response = await instructorService.list();
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/instructor", async (req, res) => {
    try {
      const response = await instructorService.save(req.body);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.delete("/instructor/:id", async (req, res) => {
    try {
      const response = await instructorService.del(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.put("/instructor/:id", async (req, res) => {
    try {
      const response = await instructorService.edit(req.params.id, req.body);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/instructor/:id", async (req, res) => {
    try {
      const response = await instructorService.get(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/instructors/faculty/:id", async (req, res) => {
    try {
      const response = await instructorService.getByFaculty(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
