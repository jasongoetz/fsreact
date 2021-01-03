
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
    userLeagues: League[];
}

export interface LeagueContext extends League {
    gamblers: GamblerInfo[];
    topBets: {bets: FullBet[], parlays: Parlay[]};
    invites: LeagueInvite[];
}

export interface League {
    id: number;
    name: string;
    sport: Sport;
    startingAccount: number;
    weeklyBetCountMax: number;
    weeklyBetAccountRatio: number;
    moneyline: string,
    landingMessage: string,
    admin: number
}

export type LeagueRequest = Pick<League, "name" | "sport" | "startingAccount" | "weeklyBetAccountRatio" | "weeklyBetCountMax">;

export type Sport = 'CFB' | 'NFL' | 'NBA';

export interface Gambler {
    id: number;
    user: User;
    league: number;
}

export interface GamblerInfo extends Gambler {
    bets: Bet[];
    parlays: Parlay[];
    money: number;
    pending: number;
    wins: number;
    losses: number;
    pushes: number;
    record: string;
}

export interface Invite {
    token: string;
    email: string;
    user: number;
    league: number;
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

export type OverUnder = 'OVER' | 'UNDER';
export type Outcome = 'WIN' | 'LOSS' | 'PUSH';

export interface Wager {
    id: number;
    gambler: number | Gambler;
    time: string
    amount: number;
    outcome: Outcome;
    complete: boolean;
}

export interface Bet extends Wager {
    bettable: Bettable;
    sideId: string;
    overunder: OverUnder;
    line: string;
}

export interface Parlay extends Wager {
    bets: Bet[]
}

export type PotentialBet = {
    bettable: Bettable;
    sideId?: string;
    overunder?: OverUnder;
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
    overunder?: OverUnder;
    line: string;
}

export interface CartParlay {
    active: boolean;
    amount: number;
}

export const Sports = {
    CFB: {key: "CFB", value: 0, name: "College Football"},
    NFL: {key: "NFL", value: 1, name: "NFL"},
    NBA: {key: "NBA", value: 2, name: "NBA"}
};

export interface LeagueInvite {
    id: number;
    email: string;
    user: number;
    league: number;
}

export interface Credentials {
    email: string;
    password: string;
    token?: string;
}
