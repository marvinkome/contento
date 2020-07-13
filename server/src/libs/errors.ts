export function handleError(statusCode: number, message: string) {
    return {
        statusCode,
        body: {
            message
        }
    };
}
