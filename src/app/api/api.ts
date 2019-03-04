
import { post, get } from './fetch';

export interface Token {
    userId: number;
    issueDate: number;
}

export class ResponseError extends Error {
    constructor(message: string, code: string) {
        super(message);
        this.name = 'ResponseError';
        this.code = code;
    }
    code: string;
}

export interface LoginUser {
    email: string;
    password: string;
    token?: string;
}

export const login: any = async ({ //TODO: Make this an auth object
                                email,
                                password,
                                token,
                            }: LoginUser): Promise<string> => {
    const response = await post({
        path: `/api/auth`,
        body: JSON.stringify({ email, password, token }),
    });

    let headers = await response.headers;
    console.log("HEADERS: " + JSON.stringify(headers));

    let data = await response.json();
    console.log("Data: " + JSON.stringify(data));

    return data;
};













