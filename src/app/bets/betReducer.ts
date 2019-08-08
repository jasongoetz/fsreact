
import { LOAD_BETS, BETS_LOAD_SUCCESS, BETS_LOAD_FAILURE } from '../bets/betActions';
import {Bettable} from "../bettables/bettableReducer";

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

const initialState = {
    betsAndParlaysByGambler: {}
};

const betReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOAD_BETS:
            return { ...state, loading: true };
        case BETS_LOAD_SUCCESS:
            return { ...state, loading: false, betsAndParlaysByGambler: action.data };
        case BETS_LOAD_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default betReducer;