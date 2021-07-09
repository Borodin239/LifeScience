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
    [401003, {
        argumentsNumber: 0,
        messagePattern: "Invalid access token"
    }],
    [401004, {
        argumentsNumber: 0,
        messagePattern: "Expired access token"
    }],
    [401005, {
        argumentsNumber: 0,
        messagePattern: "Wrong login/password"
    }],
]);
