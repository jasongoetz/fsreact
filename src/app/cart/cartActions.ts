import {State} from "../App";
import { ThunkAction } from 'redux-thunk';
import {AnyAction} from "redux";
import {
    getGamblerBetCart,
    createCartBet,
    toggleParlayOnGamblerBetCart,
    editCartAmount,
    removeFromCart, editParlayAmount, makeBets
} from "../api/api";

export const LOAD_CART = "LOAD_CART";
export const CART_LOAD_SUCCESS = "CART_LOAD_SUCCESS";
export const CART_PARLAY_TOGGLE_SUCCESS = "CART_PARLAY_TOGGLE_SUCCESS";
export const CART_PARLAY_EDIT_SUCCESS = "CART_PARLAY_EDIT_SUCCESS";
export const CART_PLACE_BET_SUCCESS = "CART_PLACE_BET_SUCCESS";
export const CART_EDIT_BET_SUCCESS = "CART_EDIT_BET_SUCCESS";
export const CART_REMOVE_SUCCESS = "CART_REMOVE_SUCCESS";
export const CART_LOAD_FAILURE = "CART_LOAD_FAILURE";
export const CART_CONFIRM_SUCCESS = "CART_CONFIRM_SUCCESS";

export const loadCart = (gamblerId: number): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch) => {
        const cart = await getGamblerBetCart(gamblerId);
        dispatch({
            type: CART_LOAD_SUCCESS,
            data: cart
        });
    };
};

export const addBetToCart = (gamblerId: number, bet): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch) => {
        const cartBet = await createCartBet(gamblerId, bet);

        if (cartBet) {
            dispatch({
                type: CART_PLACE_BET_SUCCESS,
                data: {cartBet: cartBet}
            });
        }
    };
};

export const editCartBet = (gamblerId: number, cartId: number, amount: number): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch) => {
        if (isNaN(amount)) {
            return;
        }
        await editCartAmount(gamblerId, cartId, amount);

        dispatch({
            type: CART_EDIT_BET_SUCCESS,
            data: { id: cartId, amount }
        });
    };
};

export const removeCartBet = (gamblerId: number, cartId: number): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch) => {
        await removeFromCart(gamblerId, cartId);

        dispatch({
            type: CART_REMOVE_SUCCESS,
            data: { id: cartId }
        });
    };
};

export const toggleParlay = (gamblerId: number, active: boolean): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch) => {
        await toggleParlayOnGamblerBetCart(gamblerId, active);

        dispatch({
            type: CART_PARLAY_TOGGLE_SUCCESS,
            data: {active: active}
        });
    };
};

export const editCartParlay = (gamblerId: number, amount: number): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch) => {
        if (isNaN(amount)) {
            return;
        }
        await editParlayAmount(gamblerId, amount);

        dispatch({
            type: CART_PARLAY_EDIT_SUCCESS,
            data: { amount }
        });
    };
};

export const confirmBets = (gamblerId: number): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch) => {
        await makeBets(gamblerId);

        dispatch({
            type: CART_CONFIRM_SUCCESS,
        });
    };
};
