module.exports = function (app) {
    const lessonService = require("../services/lesson")

    app.get("/lessons", (req, res) => {
        const response = lessonService.list()
        res.status(response.status).json(response)
    })

    app.post("/lesson", function (req, res) {
        const response = lessonService.save(req.body)
        res.status(response.status).json(response)
    })

    app.delete("/lesson/:id", (req, res) => {
        const response = lessonService.del(req.params.id)
        res.status(response.status).json(response)
    })

    app.get("/lesson/:id", (req, res) => {
        const response = lessonService.get(req.params.id)
        res.status(response.status).json(response)
    })

    app.delete("/lessons/deassign", (req, res) => {
        throw new Error("Not implemented")
    })

    app.get("/lesson/class/:index", (req, res) => {
        throw new Error("Not implemented")
    })

    app.post("/lessons/assign/:index", function (req, res) {
        throw new Error("Not implemented")
        // const code = assignCourse(req.params.index, req.body)
        // if (code === 0) sendResponse(res, 201, code)
        // else if (code === 1) sendResponse(res, 409, code)
        // else sendResponse(res, 400, code)
    })

    console.log("Lesson controller initialized...")
}
