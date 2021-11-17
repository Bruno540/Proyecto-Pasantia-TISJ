export class ApiError extends Error {

    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        console.log("hola" + message)
    }

    static badRequestError(message: string) {
        return new ApiError(message, 400);
    }

    static internalError(message: string) {
        console.log("hola" + message)
        
        return new ApiError(message, 500);
    }

}