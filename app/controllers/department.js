module.exports = function (app) {
  const departmentService = require("../services/department");

  app.get("/departments", async (req, res) => {
    try {
      const response = await departmentService.list();
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/department", async (req, res) => {
    try {
      const response = await departmentService.save(req.body);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.delete("/department/:id", async (req, res) => {
    try {
      const response = await departmentService.del(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.put("/department/:id", async (req, res) => {
    try {
      const response = await departmentService.edit(req.params.id, req.body);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/department/:id", async (req, res) => {
    try {
      const response = await departmentService.get(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/department/name/:name", async (req, res) => {
    try {
      const response = await departmentService.getFromName(req.params.name);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
