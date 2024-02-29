const ResponseStatus = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
}

class Response {
    constructor(status, data, message) {
        this.status = status
        this.message = message
        this.data = data
    }
}

module.exports = {
    Response,
    ResponseStatus
}
