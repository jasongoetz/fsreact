export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export type Sport = 'CFB' | 'NFL' | 'NBA';

export interface Gambler {
    id: number;
    user: number;
    league: number;
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