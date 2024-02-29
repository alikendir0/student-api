const fs = require("fs")
const Base = require("./base")
const PathModule = require("path")

class FileManager extends Base {
    static getFile(path) {
        try {
            const data = fs.readFileSync(path)
            return JSON.parse(data)
        } catch (error) {
            this.saveFile(path, [])
            return []
        }
    }

    static saveFile(path, data) {
        try {
            const directory = PathModule.dirname(path);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }
            fs.writeFileSync(path, JSON.stringify(data, null, 2));
        } catch (error) {
            return []
        }

    }
}

module.exports = FileManager
