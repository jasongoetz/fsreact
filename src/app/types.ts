import {Bettable} from "./bettables/bettableReducer";

export interface User {
    id: number;
    createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
}

export type Sport = 'CFB' | 'NFL' | 'NBA';

export interface Gambler {
    id: number;
    user: User;
    league: number;
}

export interface GamblerInfo {
    id: number;
    user: User;
    league: number;
    money: number;
    pending: number;
    wins: number;
    losses: number;
    pushes: number;
    record: string;
}

export interface League {
    id: number;
    name: string;
    sport: Sport;
    startingAccount: number;
    weeklyBetAccountRatio: number,
    weeklyBetCountMax: number,
    landingMessage: string,
    admin: number
}

export interface Bet {
    id: number,
    time: string,
    amount: number,
    sideId: string,
    overunder: string,
    line: string,
    outcome: string,
    complete: boolean,
    archived: boolean,
    gambler: Gambler,
    bettable: Bettable,
    parlay: any,
}

export interface FullLeague extends League {
    gamblers: GamblerInfo[],
    topBets: any;
}
