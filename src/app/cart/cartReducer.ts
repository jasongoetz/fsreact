
import {
    LOAD_CART,
    CART_LOAD_SUCCESS,
    CART_LOAD_FAILURE,
    CART_PARLAY_TOGGLE_SUCCESS,
    CART_PLACE_BET_SUCCESS, CART_EDIT_BET_SUCCESS, CART_REMOVE_SUCCESS, CART_PARLAY_EDIT_SUCCESS
} from './cartActions';
import {Bet, Parlay} from "../types";
import {Bettable} from "../bettables/bettableReducer";
import {Outcome, OverUnder} from "../bets/betReducer";

export type CartBet = {
    id: number;
    gambler: number;
    bettable: Bettable;
    amount: number;
    sideId: string;
    overunder: OverUnder;
    line: string;
};

export type CartParlay = {
    id: number;
    active: boolean;
    amount: number;
}

export type Cart = {
    bets: CartBet[],
    parlay?: CartParlay,
};

const initialState: Cart = {
    bets: [],
};

const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOAD_CART:
            return { ...state, loading: true };
        case CART_LOAD_SUCCESS:
            return { ...state, loading: false, ...action.data };
        case CART_PLACE_BET_SUCCESS:
            return { ...state, bets: [...state.bets, action.data.cartBet] };
        case CART_EDIT_BET_SUCCESS:
            return { ...state, bets: state.bets.map(bet => (bet.id === action.data.id) ? {...bet, ...action.data} : bet) };
        case CART_REMOVE_SUCCESS:
            let bets = state.bets.filter(bet => (bet.id !== action.data.id));
            let parlay = {...state.parlay, active: state.parlay && state.parlay.active && bets.length > 1};
            return { ...state, bets, parlay };
        case CART_PARLAY_TOGGLE_SUCCESS:
            return { ...state, parlay: { ...state.parlay, active: action.data.active } };
        case CART_PARLAY_EDIT_SUCCESS:
            return { ...state, parlay: { ...state.parlay, amount: action.data.amount } };
        case CART_LOAD_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default cartReducer;