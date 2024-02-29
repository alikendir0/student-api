const {ValidationError} = require("./error")
const Base = require("./base")

class Lesson extends Base {
    constructor(ad, soyad, tcNo, ogrenciNo, dersler = []) {
        super()
        this.ad = ad
        this.soyad = soyad
        this.tcNo = tcNo
        this.ogrenciNo = ogrenciNo
        this.dersler = dersler
    }

    static create(studentData) {
        const validation = this.validate(studentData)
        if (validation === true) {
            return new Student(studentData.ad, studentData.soyad, studentData.tcNo, studentData.ogrenciNo, studentData.dersler)
        }
        return validation
    }

    assignCourse(kod) {
        if (typeof kod === "string" && !this.dersler.includes(kod)) {
            this.dersler.push(kod)
            return 0
        } else if (this.dersler.includes(kod)) {
            return 1
        } else {
            return 2
        }
    }

    resetCourses() {
        this.dersler = []
    }

    static validate(data) {
        const errors = []

        if (data.ad === null || data.ad === "" || !(typeof data.ad === "string")) {
            errors.push(new ValidationError("Name is not valid or empty", data.ad))
        }

        if (data.soyad === null || data.soyad === "" || !(typeof data.soyad === "string")) {
            errors.push(new ValidationError("Surname is not valid or empty", data.soyad))
        }

        if (!this.tcNoCheck(data.tcNo)) {
            errors.push(new ValidationError("TC number is not valid", data.tcNo))
        }

        if (data.ogrenciNo && data.ogrenciNo.length !== 6) {
            errors.push(new ValidationError("Student number is not valid", data.ogrenciNo))
        } else if (data.ogrenciNo === null || data.ogrenciNo === "") {
            errors.push(new ValidationError("Student number can't be empty", data.ogrenciNo))
        }

        if (data.dersler && data.dersler instanceof Array) {
            errors.push(new ValidationError("Courses are not valid", data.dersler))
        }

        if (errors.length > 0) {
            return errors
        }

        return true
    }

    static tcNoCheck(tcNo) {
        var temp = String(tcNo).split("").map(Number)
        if (!/^\d{11}$/.test(tcNo)) return false

        let temp10 = 0
        let temp11 = 0
        for (let i = 0; i < temp.length; i++) {
            switch (i) {
                case 0:
                    if (temp[i] == 0) {
                        return false
                    }
                    temp10 += temp[i]
                    break
                case 1:
                    temp11 += temp[i]
                    break
                case 2:
                    temp10 += temp[i]
                    break
                case 3:
                    temp11 += temp[i]
                    break
                case 4:
                    temp10 += temp[i]
                    break
                case 5:
                    temp11 += temp[i]
                    break
                case 6:
                    temp10 += temp[i]
                    break
                case 7:
                    temp11 += temp[i]
                    break
                case 8:
                    temp10 += temp[i]
                    break
                case 9:
                    if (!((temp10 * 7 - temp11) % 10 == temp[i])) {
                        return false
                    }
                    temp11 += temp[i]
                    break
                case 10:
                    if (!((temp10 + temp11) % 10 == temp[i])) {
                        return false
                    }
                    break
            }
        }
        return true
    }
}
module.exports = Lesson
