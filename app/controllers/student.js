module.exports = function (app) {
    const studentService = require("../services/student")

    app.get("/students", (req, res) => {
        const response = studentService.list()
        res.status(response.status).json(response)
    })

    app.post("/student", function (req, res) {
        const response = studentService.save(req.body)
        res.status(response.status).json(response)
    })

    app.delete("/student/:id", (req, res) => {
        const response = studentService.del(req.params.id)
        res.status(response.status).json(response)
    })

    app.get("/student/:id", (req, res) => {
        const response = studentService.get(req.params.id)
        res.status(response.status).json(response)
    })

    app.delete("/students/deassign", (req, res) => {
        throw new Error("Not implemented")
    })

    app.get("/student/class/:index", (req, res) => {
        throw new Error("Not implemented")
    })

    app.post("/students/assign/:index", function (req, res) {
        throw new Error("Not implemented")
        // const code = assignCourse(req.params.index, req.body)
        // if (code === 0) sendResponse(res, 201, code)
        // else if (code === 1) sendResponse(res, 409, code)
        // else sendResponse(res, 400, code)
    })

    console.log("Student controller initialized...")
}
