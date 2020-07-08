export class ErrorHandler extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super();

        this.statusCode = statusCode;
        this.message = message;
    }
}

export function handleError(statusCode: number, message: string) {
    return {
        statusCode,
        body: {
            message
        }
    };
}
