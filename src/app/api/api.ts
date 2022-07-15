import { deLete, get, patch, post, put } from './fetch';
import {
    AuthToken,
    BetOrParlayWrapper,
    Bettable,
    BettableWithScore,
    CartParlay,
    Credentials,
    GameScoreRequest,
    League,
    LeagueInvite,
    LeagueRequest,
    PotentialBet,
    ScoresReport,
    UserContext,
    UserRegistrationInfo
} from "../types";
import {GamblerBets} from "../bets/bet.store";

export interface Token {
    id: number;
    issueDate: number;
}

export const login = async ({email, password, token}: Credentials): Promise<AuthToken> => {
    const response = await post({
        path: `/api/auth`,
        body: JSON.stringify({ email, password, token }),
    });

    return await response.json();
};

export const loginWithGoogle = async ({email, token}): Promise<AuthToken> => {
    const response = await post({
        path: `/api/google-auth`,
        body: JSON.stringify({ email, token }),
    });

    return await response.json();
};

export const registerUser = async (user: UserRegistrationInfo): Promise<AuthToken> => {
    const response = await post({
        path: `/api/users`,
        body: JSON.stringify(user),
    });

    return await response.json();
};

export const requestPasswordReset = async (email): Promise<void> => {
    await post({
        path: `/api/password/reset-request`,
        body: JSON.stringify({ email }),
    });
};

export const resetUserPassword = async (token, password): Promise<void> => {
    await put({
        path: `/api/password/update`,
        body: JSON.stringify({token, password, confirmation: password})
    })
}

export const registerLeague = async (userId: number, leagueInfo: LeagueRequest): Promise<League> => {
    const response = await post({
        path: `/api/leagues`,
        body: JSON.stringify({...leagueInfo, weeklyBetAccountRatio: leagueInfo.weeklyBetAccountRatio / 100, admin: userId}),
    });

    return await response.json();
};

export const getUserContext = async (userId): Promise<UserContext> => {
    const response = await get({
        path: `/api/users/${userId}/context`,
    });

    return await response.json();
};

export const updateUser = async (userId, user): Promise<void> => {
    await patch({
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

export const joinLeague = async (userId, token): Promise<void> => {
    await post({
        path: `/api/users/${userId}/leagues`,
        body: JSON.stringify({
            token: token,
        })
    });
}

export const switchUserLeague = async (userId, leagueId): Promise<void> => {
    await put({
        path: `/api/users/${userId}/current-league`,
        body: JSON.stringify({
            leagueId: leagueId,
        })
    })
}

export const postInvite = async (leagueId: number, email: string): Promise<LeagueInvite> => {
    const response = await post({
        path: `/api/leagues/${leagueId}/invites`,
        body: JSON.stringify({ email })
    });

    return await response.json();
};

export const revokeInvite = async (leagueId: number, inviteId: number): Promise<void> => {
    await deLete({
        path: `/api/leagues/${leagueId}/invites/${inviteId}`,
    });
    return;
};

export const renewGambler = async (gamblerId): Promise<void> => {
    await post({
        path: `/api/gamblers/${gamblerId}/renew`
    })
}

export const getTransactionsForGambler = async (gamblerId): Promise<BetOrParlayWrapper[]> => {
    const response = await get({
        path: `/api/gamblers/${gamblerId}/transactions`,
    });

    return await response.json();
};

export const getAllGamesForOpenBets = async (future?: boolean): Promise<BettableWithScore[]> => {
    const response = await get({
        path: `/api/admin/games` + (future ? '?future=true' : ''),
    });
    return await response.json();
};


export const postGameScores = async (scores: GameScoreRequest[]) => {
    await post({
        path: `/api/admin/games`,
        body: JSON.stringify({scores: scores})
    });
};

export const getGamesForSport = async (sportKey): Promise<{bettables: Bettable[]}> => {
    const response = await get({
        path: `/api/games?sport=${sportKey}`,
    });

    return await response.json();
};

export const getBetsForLeague = async (leagueId): Promise<GamblerBets> => {
    const response = await get({
        path: `/api/leagues/${leagueId}/bets`,
    });

    return await response.json();
};

export const getLiveScores = async (leagueId: number, week?: number): Promise<ScoresReport> => {
    const response = await get({
        path: `/api/leagues/${leagueId}/scores` + (week ? `?week=${week}` : ''),
    });

    return await response.json();
};

export const validateBets = async (gamblerId: number, bets: PotentialBet[], parlay?: CartParlay): Promise<string[]> => {
    const response = await post({
        path: `/api/gamblers/${gamblerId}/cart/validate`,
        body: JSON.stringify({bets, parlay})
    });

    return await response.json();
};

export const makeBets = async (gamblerId: number, bets: PotentialBet[], parlay?: CartParlay) => {
    await post({
        path: `/api/gamblers/${gamblerId}/cart/confirm`,
        body: JSON.stringify({bets, parlay})
    });
};

export const getInviteByToken = async (token: string) => {
    const response = await get({
        path: `/api/invites?token=${token}`
    });

    return await response.json();
}
















