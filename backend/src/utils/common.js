export const customizeError = (code, customMessage, errorData, additional) => {
    const messageIs = customMessage ? customMessage : errorData.message;
    let result = new Error(messageIs);

    if (code === undefined) {
        result.statusCode = errorData?.statusCode ? errorData?.statusCode : 500;
    } else {
        result.statusCode = code;
    }

    if (errorData?.stack !== undefined) {
        result.stack = errorData.stack;
    }

    if (errorData?.additional !== undefined) {
        result.additional = errorData.additional;
    } else if (additional !== undefined) {
        result.additional = additional;
    }
    if (errorData?.errors !== undefined) {
        result.errors = errorData.errors;
    }

    return result;
};