import createState from 'react-copy-write';
import {Bettable} from "../types";

export type OverUnder = 'OVER' | 'UNDER';
export type Outcome = 'WIN' | 'LOSS' | 'PUSH';

export type Bet = {
    gambler: number;
    bettable: Bettable;
    time: string
    amount: number;
    sideId: string;
    overunder: OverUnder;
    line: string;
    outcome: Outcome;
    complete: boolean;
};

export interface BetContext {
    betsAndParlaysByGambler: any; //TODO: Fix
}

const initialState = {
    betsAndParlaysByGambler: {}
};

const {
    Provider,
    Consumer,
    mutate,
} = createState<BetContext>(initialState);

export { Provider as BetProvider, Consumer as BetConsumer, mutate }
