
export interface AuthToken {
    issued: string;
    expires: string;
    token: string;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    notifyprocessedbets: boolean;
}

export interface User extends UserProfile {
    id: number;
    createdAt: string;
    systemAdmin: boolean;
    leagueInvites: LeagueInviteWithFullLeague[];
    googleAccountId: number;
    fsAccountId: number;
}

export interface UserRegistrationInfo {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string;
}

export interface UserContext {
    user: User;
    league: LeagueContext;
    gambler: GamblerInfo;
    gamblerStatus: GamblerStatus;
    userLeagues: League[];
    week: SportWeek;
}

export interface LeagueContext extends League {
    gamblers: GamblerInfo[];
    topBets: {bets: FullBet[], parlays: Parlay[]};
    invites: LeagueInvite[];
}

export interface SportWeek {
    week: number;
    name: string;
    start: Date;
}

export interface League {
    id: number;
    name: string;
    sport: Sport;
    startingAccount: number;
    weeklyBetCountMax: number;
    weeklyBetAccountRatio: number;
    moneyline: number,
    landingMessage: string,
    adminId: number
}

export type LeagueRequest = Pick<League, "name" | "sport" | "startingAccount" | "weeklyBetAccountRatio" | "weeklyBetCountMax">;

export type Sport = 'CFB' | 'NFL' | 'NBA' | 'WNBA';

export interface Gambler {
    id: number;
    user: User;
    league: number;
    defunct: boolean;
}

export interface GamblerInfo extends Gambler {
    bets: Bet[];
    parlays: Parlay[];
    tallies: {
        money: number;
        pending: number;
        wins: number;
        losses: number;
        pushes: number;
        record: string;
        moneylineRecord: string;
    }
}

export interface GamblerStatus {
    startingMoneyThisWeek: number;
    betsThisWeek: Bet[];
    moneyBetThisWeek: number;
}

export interface Invite {
    token: string;
    email: string;
    user: number;
    league: number;
    accepted?: boolean;
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
    team1Moneyline: string;
    team2Moneyline: string;
    overUnder: string;
    ouoff: boolean;
    off: boolean;
};

export type BettableWithScore = Bettable & { gameScore?: GameScore }

export type BettableWithBetsAndScore = BettableWithScore & { bets: Bet[] }

export interface ScoresReport {
    scores: BettableWithBetsAndScore[],
    gamblerNames: { [id: number]: string },
    parlays: Parlay[],
}

interface TeamInfo {
    teamId: number,
    name: string,
    alias1?: string,
    alias2?: string,
    alias3?: string;
    sport: Sport;
}

export type ClockStatus = 'STATUS_FINAL' | 'STATUS_SCHEDULED' | 'STATUS_IN_PROGRESS';

export interface GameScore {
    id: number;
    bettableId: number;
    team1: TeamInfo;
    team2: TeamInfo;
    team1Score: number;
    team2Score: number;
    clockText: string;
    clockTime: string;
    clockPeriod: number;
    clockStatus: ClockStatus;
}

export interface GameScoreRequest {
    bettableId: number;
    side1Score: number;
    side2Score: number;
}

export enum OverUnder {
  OVER = 'OVER',
  UNDER = 'UNDER',
}

export enum Outcome {
    WIN = 'WIN',
    LOSS = 'LOSS',
    PUSH = 'PUSH'
}

export interface Wager {
    id: number;
    gambler: Gambler;
    gamblerId: number;
    time: string
    amount: number;
    outcome: Outcome;
    complete: boolean;
}

export interface Bet extends Wager {
    bettable: Bettable;
    sideId: string;
    overUnder: OverUnder;
    line: string;
    moneyline: boolean;
    parlayId?: number;
    parlay?: Parlay;
    infoRedacted?: boolean;
}

export interface Parlay extends Wager {
    bets: Bet[]
}

export type PotentialBet = {
    bettable: Bettable;
    sideId?: string;
    overUnder?: OverUnder;
    moneyline: boolean;
}

export interface FullBet extends Bet {
    archived: boolean,
    gambler: Gambler,
    parlay?: Parlay,
}

type BetOrParlay = Bet | Parlay;

export interface BetOrParlayWrapper {
    type: string;
    value: BetOrParlay;
    tally: number;
}

export interface Cart {
    bets: CartBet[];
    parlay: CartParlay;
}

export interface CartBet {
    id: string;
    bettable: Bettable;
    amount: number;
    sideId?: string;
    moneyline: boolean;
    overUnder?: OverUnder;
    line: string;
}

export interface CartParlay {
    active: boolean;
    amount: number;
}

export const Sports = {
    CFB: {key: "CFB", value: 0, name: "College Football"},
    NFL: {key: "NFL", value: 1, name: "NFL"},
    NBA: {key: "NBA", value: 2, name: "NBA"},
    WNBA: {key: "WNBA", value: 3, name: "WNBA"}
};

export interface LeagueInvite {
    id: number;
    email: string;
    user: number;
    league: number;
}

export interface LeagueInviteWithFullLeague {
    id: number;
    token: string;
    email: string;
    user: number;
    league: League;
}

export interface Credentials {
    email: string;
    password: string;
    token?: string;
}
