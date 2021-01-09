export default class ApiError extends Error {
    static TYPE = 'API_ERROR';

    readonly payload: any;
    readonly type = ApiError.TYPE;

    constructor(payload, ...params) {
        super(...params);
        this.payload = payload;
    }

    static is(err: any): err is ApiError {
        return err.type === ApiError.TYPE;
    }
}
