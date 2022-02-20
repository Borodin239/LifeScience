import apiConstants from "./apiConstants";

type ApiErrorInfoSetup = {
    messagePattern: string
}

export const apiErrorsInfo: ReadonlyMap<number, ApiErrorInfoSetup> = new Map([
    [apiConstants.errors.MISSING_PROPERTY_NAME, {
        messagePattern: "Field $0 is missing"
    }],
    [apiConstants.errors.INVALID_PROPERTY_NAME, {
        messagePattern: "Field $0 has unrecognizable value '$1'"
    }],
    [apiConstants.errors.USER_ALREADY_EXISTS, {
        messagePattern: "Email '$0' is already in use"
    }],
    [apiConstants.errors.REGULAR_EXPRESSION_VALIDATION_FAILED, {
        messagePattern: "Validation error: $0"
    }],
    [apiConstants.errors.INVALID_REFRESH_TOKEN, {
        messagePattern: "Invalid refresh token"
    }],
    [apiConstants.errors.EXPIRED_REFRESH_TOKEN, {
        messagePattern: "Expired refresh token. Please re-login"
    }],
    [apiConstants.errors.INVALID_ACCESS_TOKEN, {
        messagePattern: "Invalid access token"
    }],
    [apiConstants.errors.EXPIRED_ACCESS_TOKEN, {
        messagePattern: "Expired access token. Please logout and login. This is a temporary measure, we apologize for the inconvenience"
    }],
    [apiConstants.errors.WRONG_CREDENTIALS, {
        messagePattern: "Wrong login/password"
    }],
    [apiConstants.errors.UNCHECKED_EMAIL, {
        messagePattern: "You haven't verified your account. Please check your email."
    }],
    [apiConstants.errors.PERMISSION_DENIED, {
        messagePattern: "No required permissions to perform the operation"
    }],
    [apiConstants.errors.NON_EMPTY_CATEGORY, {
        messagePattern: "You can't rename/delete a non-empty category yet."
    }],
    [apiConstants.errors.APPROACH_NOT_FOUND, {
        messagePattern: "Approach not found."
    }],
    [apiConstants.errors.SECTION_NOT_FOUND, {
        messagePattern: "Section not found."
    }]
]);
