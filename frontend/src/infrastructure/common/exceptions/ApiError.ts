export type ApiErrorDescription = {
    httpCode: number,
    systemCode: number,
    message: string
}

export class ApiError extends Error {
    readonly description: ApiErrorDescription;

    constructor(description: ApiErrorDescription) {
        super(description.message);
        this.name = 'ApiError';
        this.description = description;
    }
}
