module.exports = function (app) {
  const sectionService = require("../services/section");

  app.get("/sections", async (req, res) => {
    try {
      const response = await sectionService.list();
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/section", async (req, res) => {
    try {
      const response = await sectionService.save(req.body);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.delete("/section/:id", async (req, res) => {
    try {
      const response = await sectionService.del(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/section/:id", async (req, res) => {
    try {
      const response = await sectionService.get(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  console.log("Section controller initialized...");
};
