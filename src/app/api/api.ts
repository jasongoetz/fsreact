
import { post, get } from './fetch';
import {Credentials} from "../auth/authModels";

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

export const login: any = async ({
                                email,
                                password,
                                token,
                            }: Credentials): Promise<string> => {
    const response = await post({
        path: `/api/auth`,
        body: JSON.stringify({ email, password, token }),
    });

    let data = await response.json();
    return data;
};

export const getUserContext: any = async (userId): Promise<string> => {
    const response = await get({
        path: `/api/users/${userId}/context`,
    });

    let data = await response.json();
    return data;
};

export const getTransactionsForGambler: any = async (gamblerId): Promise<string> => {
    const response = await get({
        path: `/api/gamblers/${gamblerId}/transactions`,
    });

    let data = await response.json();
    return data;
};

export const getGamesForSport: any = async (sportKey): Promise<string> => {
    const response = await get({
        path: `/api/games?sport=${sportKey}`,
    });

    let data = await response.json();
    return data;
};














