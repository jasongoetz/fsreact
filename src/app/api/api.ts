
import {post, get, deLete, put} from './fetch';
import {
    Bet,
    BetOrParlayWrapper,
    Bettable,
    CartBet, CartParlay,
    Credentials, League, LeagueInfo,
    LeagueInvite,
    UserRegistrationInfo
} from "../types";
import {GamblerBets} from "../bets/bet.store";

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

//TODO: Fix return type
export const login = async ({email, password, token}: Credentials): Promise<any> => {
    const response = await post({
        path: `/api/auth`,
        body: JSON.stringify({ email, password, token }),
    });

    let data = await response.json();
    return data;
};

//TODO: Fix return type
export const loginWithGoogle = async ({email, token}): Promise<any> => {
    const response = await post({
        path: `/api/google-auth`,
        body: JSON.stringify({ email, token }),
    });

    let data = await response.json();
    return data;
};

//TODO: Fix return type
export const registerUser = async (user: UserRegistrationInfo): Promise<any> => {
    const response = await post({
        path: `/api/users`,
        body: JSON.stringify(user),
    });

    let data = await response.json();
    return data;
};

export const registerLeague = async (userId: number, leagueInfo: LeagueInfo): Promise<League> => {
    const response = await post({
        path: `/api/leagues`,
        body: JSON.stringify({...leagueInfo, weeklyBetAccountRatio: leagueInfo.weeklyBetAccountRatio / 100, admin: userId}),
    });

    let data = await response.json();
    return data;
};

//TODO: Fix return type
export const getUserContext = async (userId): Promise<any> => {
    const response = await get({
        path: `/api/users/${userId}/context`,
    });

    let data = await response.json();
    return data;
};

export const updateUser = async (userId, user): Promise<void> => {
    await put({
        path: `/api/users/${userId}`,
        body: JSON.stringify(user)
    });
};

export const updateUserPass = async (userId, password): Promise<void> => {
    await put({
        path: `/api/users/${userId}/password`,
        body: JSON.stringify({
            password: password,
            confirmation: password,
        })
    });
};

export const postInvite = async (leagueId: number, email: string): Promise<LeagueInvite> => {
    const response = await post({
        path: `/api/leagues/${leagueId}/invites`,
        body: JSON.stringify({ email })
    });

    let data = await response.json();
    return data;
};

export const revokeInvite = async (leagueId: number, inviteId: number): Promise<void> => {
    await deLete({
        path: `/api/leagues/${leagueId}/invites/${inviteId}`,
    });
    return;
};

export const getTransactionsForGambler = async (gamblerId): Promise<BetOrParlayWrapper[]> => {
    const response = await get({
        path: `/api/gamblers/${gamblerId}/transactions`,
    });

    let data = await response.json();
    return data;
};

export const getGamesForSport = async (sportKey): Promise<{bettables: Bettable[]}> => {
    const response = await get({
        path: `/api/games?sport=${sportKey}`,
    });

    let data = await response.json();
    return data;
};

export const getBetsForLeague = async (leagueId): Promise<GamblerBets> => {
    const response = await get({
        path: `/api/leagues/${leagueId}/bets`,
    });

    let data = await response.json();
    return data;
};

export const getGamblerBetCart = async (gamblerId): Promise<{ bets: CartBet[], parlay: CartParlay }> => {
    const response = await get({
        path: `/api/gamblers/${gamblerId}/cart`,
    });

    let data = await response.json();
    return data;
};

export const createCartBet = async (gamblerId: number, bet: Bet): Promise<CartBet> => {
    const response = await post({
        path: `/api/gamblers/${gamblerId}/cart`,
        body: JSON.stringify(bet)
    });

    let data = await response.json();
    return data;
};

export const editCartAmount = async (gamblerId: number, cartId: number, amount: number) => {
    await put({
        path: `/api/gamblers/${gamblerId}/cart/${cartId}`,
        body: JSON.stringify({amount: amount})
    });
};

export const removeFromCart = async (gamblerId: number, cartId: number) => {
    await deLete({
        path: `/api/gamblers/${gamblerId}/cart/${cartId}`,
    });
    return;
};

export const toggleParlayOnGamblerBetCart = async (gamblerId, active: boolean) => {
    await put({
        path: `/api/gamblers/${gamblerId}/cart/parlay`,
        body: JSON.stringify({active: active})
    });
};

export const editParlayAmount = async (gamblerId: number, amount: number) => {
    await put({
        path: `/api/gamblers/${gamblerId}/cart/parlay`,
        body: JSON.stringify({amount: amount})
    });
};

export const validateBets = async (gamblerId: number): Promise<string[]> => {
    const response = await get({
        path: `/api/gamblers/${gamblerId}/cart/validate`
    });

    let data = await response.json();
    return data;
};

export const makeBets = async (gamblerId: number) => {
    await get({
        path: `/api/gamblers/${gamblerId}/cart/confirm`
    });
};
















