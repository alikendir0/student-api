const fs = require("fs")
const Student = require("../models/student")
const fileManager = require("../managers/file")
const {Response, ResponseStatus} = require("../models/response")

const studentsPath = "data/students.json"

const list = () => {
    const students = fileManager.getFile(studentsPath)
    return new Response(ResponseStatus.SUCCESS, students)
}

const get = (id) => {
    const students = fileManager.getFile(studentsPath)

    const student = students.filter((student) => student.id === Number(id))[0]

    if (student) {
        return new Response(ResponseStatus.SUCCESS, student)
    } else {
        return new Response(ResponseStatus.BAD_REQUEST, null, "Student not found")
    }
}

const del = (id) => {
    const students = fileManager.getFile(studentsPath)

    const index = students.findIndex((student) => student.id === id)

    if (index > -1) {
        students.splice(index, 1)
        fileManager.saveFile(studentsPath, students)

        return new Response(ResponseStatus.SUCCESS, null)
    } else {
        return new Response(ResponseStatus.BAD_REQUEST, null, "Student not found")
    }
}

const save = (data) => {
    const students = fileManager.getFile(studentsPath)

    const student = Student.create(data)

    if (student instanceof Student) {
        students.push(student)
        fileManager.saveFile(studentsPath, students)

        return new Response(ResponseStatus.CREATED, student)
    } else {
        return new Response(ResponseStatus.BAD_REQUEST, student, "Invalid student data")
    }
}

module.exports = {
    list,
    get,
    del,
    save
}
