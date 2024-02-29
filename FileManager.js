const fs = require("fs");
class FileManager {
  constructor(filePath) {
    this.filePath = filePath || "studentTableContents.json";
  }

  getFile() {
    try {
      const data = fs.readFileSync(this.filePath);
      return JSON.parse(data);
    } catch (error) {
      this.saveFile([]);
      return [];
    }
  }

  saveFile(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}
module.exports = FileManager;
