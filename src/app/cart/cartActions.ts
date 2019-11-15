import {State} from "../App";
import { ThunkAction } from 'redux-thunk';
import {AnyAction} from "redux";
import {getGambler} from "../gambler/gamblerSelector";
import {
    getGamblerBetCart,
    createCartBet,
    toggleParlayOnGamblerBetCart,
    editCartAmount,
    removeFromCart, editParlayAmount
} from "../api/api";
import {Bet} from "../types";

export const LOAD_CART = "LOAD_CART";
export const CART_LOAD_SUCCESS = "CART_LOAD_SUCCESS";
export const CART_PARLAY_TOGGLE_SUCCESS = "CART_PARLAY_TOGGLE_SUCCESS";
export const CART_PARLAY_EDIT_SUCCESS = "CART_PARLAY_EDIT_SUCCESS";
export const CART_PLACE_BET_SUCCESS = "CART_PLACE_BET_SUCCESS";
export const CART_EDIT_BET_SUCCESS = "CART_EDIT_BET_SUCCESS";
export const CART_REMOVE_SUCCESS = "CART_REMOVE_SUCCESS";
export const CART_LOAD_FAILURE = "CART_LOAD_FAILURE";

export const loadCart = (): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const gambler = getGambler(getState());
        const cart = await getGamblerBetCart(gambler.id);

        dispatch({
            type: CART_LOAD_SUCCESS,
            data: cart
        });
    };
};

export const addBetToCart = (bet): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const gambler = getGambler(getState());
        const cartBet = await createCartBet(gambler.id, bet);

        if (cartBet) {
            dispatch({
                type: CART_PLACE_BET_SUCCESS,
                data: {cartBet: cartBet}
            });
        }
    };
};

export const editCartBet = (cartId: number, amount: number): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const gambler = getGambler(getState());
        await editCartAmount(gambler.id, cartId, amount);

        dispatch({
            type: CART_EDIT_BET_SUCCESS,
            data: { id: cartId, amount }
        });
    };
};

export const removeCartBet = (cartId: number): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const gambler = getGambler(getState());
        await removeFromCart(gambler.id, cartId);

        dispatch({
            type: CART_REMOVE_SUCCESS,
            data: { id: cartId }
        });
    };
};

export const toggleParlay = (active: boolean): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const gambler = getGambler(getState());
        await toggleParlayOnGamblerBetCart(gambler.id, active);

        dispatch({
            type: CART_PARLAY_TOGGLE_SUCCESS,
            data: {active: active}
        });
    };
};

export const editCartParlay = (amount: number): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const gambler = getGambler(getState());
        await editParlayAmount(gambler.id, amount);

        dispatch({
            type: CART_PARLAY_EDIT_SUCCESS,
            data: { amount }
        });
    };
};