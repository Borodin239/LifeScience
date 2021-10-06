export class NetworkError extends Error {
    constructor() {
        super('Internet connection lost');
        this.name = 'NetworkError';
    }
}
