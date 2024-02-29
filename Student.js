class Student {
  constructor(Student) {
    const { ad, soyad, tcNo, ogrenciNo, dersler = [] } = Student;
    this.ad = ad;
    this.soyad = soyad;
    this.tcNo = tcNo;
    this.ogrenciNo = ogrenciNo;
    this.dersler = dersler;
  }

  static create(studentData) {
    const validationResult = this.validateStudent(studentData);
    if (validationResult === 0) {
      return new Student(studentData);
    }
    return validationResult;
  }

  assignCourse(kod) {
    if (typeof kod === "string" && !this.dersler.includes(kod)) {
      this.dersler.push(kod);
      return 0;
    } else if (this.dersler.includes(kod)) {
      return 1;
    } else {
      return 2;
    }
  }

  resetCourses() {
    this.dersler = [];
  }

  static validateStudent(data) {
    if (data.ad === null || data.ad === "" || !(typeof data.ad === "string"))
      return 1;

    if (
      data.soyad === null ||
      data.soyad === "" ||
      !(typeof data.soyad === "string")
    )
      return 2;

    if (!this.tcNoCheck(data.tcNo)) return 3;

    if (!(data.ogrenciNo.length === 6)) return 4;

    if (!(typeof data.dersler === "object")) {
      console.log(typeof data.dersler);
      return 5;
    }
    return 0;
  }

  static tcNoCheck(tcNo) {
    var temp = String(tcNo).split("").map(Number);
    if (!/^\d{11}$/.test(tcNo)) return false;

    let temp10 = 0;
    let temp11 = 0;
    for (let i = 0; i < temp.length; i++) {
      switch (i) {
        case 0:
          if (temp[i] == 0) {
            return false;
          }
          temp10 += temp[i];
          break;
        case 1:
          temp11 += temp[i];
          break;
        case 2:
          temp10 += temp[i];
          break;
        case 3:
          temp11 += temp[i];
          break;
        case 4:
          temp10 += temp[i];
          break;
        case 5:
          temp11 += temp[i];
          break;
        case 6:
          temp10 += temp[i];
          break;
        case 7:
          temp11 += temp[i];
          break;
        case 8:
          temp10 += temp[i];
          break;
        case 9:
          if (!((temp10 * 7 - temp11) % 10 == temp[i])) {
            return false;
          }
          temp11 += temp[i];
          break;
        case 10:
          if (!((temp10 + temp11) % 10 == temp[i])) {
            return false;
          }
          break;
      }
    }
    return true;
  }
}
module.exports = Student;
