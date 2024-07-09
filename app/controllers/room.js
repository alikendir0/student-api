module.exports = function (app) {
  const roomService = require("../services/room");

  app.get("/rooms", async (req, res) => {
    try {
      const response = await roomService.list();
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.post("/room", async (req, res) => {
    try {
      const response = await roomService.save(req.body);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.delete("/room/:id", async (req, res) => {
    try {
      const response = await roomService.del(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.put("/room/:id", async (req, res) => {
    try {
      const response = await roomService.edit(req.params.id, req.body);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  app.get("/room/:id", async (req, res) => {
    try {
      const response = await roomService.get(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};
