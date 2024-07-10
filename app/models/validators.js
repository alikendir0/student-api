class Validators {
  static isValidInteger(value) {
    if (Number.isInteger(value)) {
      return true;
    }
    return false;
  }

  static isValidName(value) {
    if (value === null || value === "" || !(typeof value === "string")) {
      return false;
    }
    return true;
  }

  static isValidNo(value) {
    if (value && value.length !== 8) {
      return false;
    } else if (value === null || value === "") {
      return false;
    }
    return true;
  }
  static isValidId(value) {
    var temp = String(value).split("").map(Number);
    if (!/^\d{11}$/.test(value)) return false;

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

module.exports = Validators;
