type ApiErrorInfoSetup = {
    argumentsNumber: number,
    messagePattern: string
}

export const apiErrorsInfo: ReadonlyMap<number, ApiErrorInfoSetup> = new Map([
    [401001, {
        argumentsNumber: 0,
        messagePattern: "Invalid refresh token"
    }],
    [401002, {
        argumentsNumber: 0,
        messagePattern: "Expired refresh token"
    }],
    [401011, {
        argumentsNumber: 0,
        messagePattern: "Invalid access token"
    }],
    [401012, {
        argumentsNumber: 0,
        messagePattern: "Expired access token"
    }],
]);
