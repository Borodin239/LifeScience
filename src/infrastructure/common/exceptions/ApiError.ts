export type ApiErrorDescription = {
    httpCode: number,
    systemCode: number,
    message: string
}

export class ApiError extends Error {
    readonly descriptor: ApiErrorDescription;

    constructor(descriptor: ApiErrorDescription) {
        super(descriptor.message);
        this.name = 'ApiError';
        this.descriptor = descriptor;
    }
}
