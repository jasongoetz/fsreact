export default class ApiError extends Error {
    static TYPE = 'API_ERROR';

    readonly payload: any;
    readonly type = ApiError.TYPE;

    constructor(payload, ...params) {
        super(...params);
        this.payload = payload;
    }
}
