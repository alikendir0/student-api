class CustomError {
    constructor(code, message, data) {
        this.code = code
        this.message = message
        this.data = data
    }
}

class ValidationError extends CustomError {
    constructor(message, data) {
        super(400, message, data)
    }
}

module.exports = {
    ValidationError,
    CustomError
}
