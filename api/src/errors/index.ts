export class ValidationError extends Error {
    message: string

    constructor(message: string) {
        super()
        this.message = message
    }
}

export class DoesNotExistError extends Error {
    message: string

    constructor(message: string) {
        super()
        this.message = message
    }
}