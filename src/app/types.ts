import {OverUnder} from "./bets/betContext";

export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    notifyprocessedbets: boolean;
}

export interface User extends UserProfile {
    id: number;
    createdAt: string;
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
    bets: Bet[];
    parlays: Parlay[];
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
    moneyline: string,
    landingMessage: string,
    admin: number
}

export type Bettable = {
    id: number;
    gameKey: string;
    gameTime: string;
    sideId1: string;
    sideId2: string;
    team1: string;
    team2: string;
    team1Spread: string;
    team2Spread: string;
    overunder: string;
    ouoff: boolean;
    off: boolean;
};

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

export interface Parlay extends Bet {
    bets: Bet[]
}

export interface BetOrParlay {
    type: string;
    value: any;
    tally: number;
}

export interface FullLeague extends League {
    gamblers: GamblerInfo[],
    topBets: any;
}

export interface CartBet {
    id: number;
    gambler: number;
    bettable: Bettable;
    amount: number;
    sideId: string;
    overunder: OverUnder;
    line: string;
}

export interface CartParlay {
    id: number;
    active: boolean;
    amount: number;
}
