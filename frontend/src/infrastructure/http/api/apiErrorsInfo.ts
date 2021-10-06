type ApiErrorInfoSetup = {
    messagePattern: string
}

export const apiErrorsInfo: ReadonlyMap<number, ApiErrorInfoSetup> = new Map([
    [400001, {
        messagePattern: "Field $0 is missing"
    }],
    [400003, {
        messagePattern: "Field $0 has unrecognizable value '$1'"
    }],
    [400004, {
        messagePattern: "Email '$0' is already in use"
    }],
    [400005, {
        messagePattern: "Server validation error: $0"
    }],

    [401001, {
        messagePattern: "Invalid refresh token"
    }],
    [401002, {
        messagePattern: "Expired refresh token"
    }],
    [401003, {
        messagePattern: "Invalid access token"
    }],
    [401004, {
        messagePattern: "Expired access token"
    }],
    [401005, {
        messagePattern: "Wrong login/password"
    }],

    [403000, {
        messagePattern: "No required permissions to perform the operation"
    }],
]);
