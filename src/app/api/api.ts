
import {post, get, deLete, put} from './fetch';
import {Credentials} from "../auth/authModels";
import {Bet} from "../types";

export interface Token {
    id: number;
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

export const updateUser = async (userId, user) => {
    await put({
        path: `/api/users/${userId}`,
        body: JSON.stringify(user)
    });
};

export const updateUserPass = async (userId, password) => {
    await put({
        path: `/api/users/${userId}/password`,
        body: JSON.stringify({
            password: password,
            confirmation: password,
        })
    });
};

export const postInvite: any = async (leagueId: number, email: string) => {
    const response = await post({
        path: `/api/leagues/${leagueId}/invites`,
        body: JSON.stringify({ email })
    });

    if (response.status === 201) {
        let data = await response.json();
        return data;
    }
};

export const revokeInvite: any = async (leagueId: number, inviteId: number) => {
    await deLete({
        path: `/api/leagues/${leagueId}/invites/${inviteId}`,
    });
    return;
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

export const getBetsForLeague: any = async (leagueId): Promise<string> => {
    const response = await get({
        path: `/api/leagues/${leagueId}/bets`,
    });

    let data = await response.json();
    return data;
};

export const getGamblerBetCart: any = async (gamblerId): Promise<string> => {
    const response = await get({
        path: `/api/gamblers/${gamblerId}/cart`,
    });

    let data = await response.json();
    return data;
};

export const createCartBet: any = async (gamblerId: number, bet: Bet) => {
    const response = await post({
        path: `/api/gamblers/${gamblerId}/cart`,
        body: JSON.stringify(bet)
    });

    if (response.status === 201) {
        let data = await response.json();
        return data;
    }
};

export const editCartAmount: any = async (gamblerId: number, cartId: number, amount: number) => {
    await put({
        path: `/api/gamblers/${gamblerId}/cart/${cartId}`,
        body: JSON.stringify({amount: amount})
    });
};

export const removeFromCart: any = async (gamblerId: number, cartId: number) => {
    await deLete({
        path: `/api/gamblers/${gamblerId}/cart/${cartId}`,
    });
    return;
};

export const toggleParlayOnGamblerBetCart: any = async (gamblerId, active: boolean) => {
    await put({
        path: `/api/gamblers/${gamblerId}/cart/parlay`,
        body: JSON.stringify({active: active})
    });
};

export const editParlayAmount: any = async (gamblerId: number, amount: number) => {
    await put({
        path: `/api/gamblers/${gamblerId}/cart/parlay`,
        body: JSON.stringify({amount: amount})
    });
};

export const validateBets: any = async (gamblerId: number) => {
    const response = await get({
        path: `/api/gamblers/${gamblerId}/cart/validate`
    });

    let data = await response.json();
    return data;
};

export const makeBets: any = async (gamblerId: number) => {
    const response = await get({
        path: `/api/gamblers/${gamblerId}/cart/confirm`
    });

    let data = await response.json();
    return data;
};
















