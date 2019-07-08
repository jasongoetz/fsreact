import {State} from "../App";
import {getTransactionsForGambler} from "../api/api";
import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";

export const TRANSACTION_LOAD_SUCCESS = "TRANSACTION_LOAD_SUCCESS";

export const loadTransactions = (gamblerId): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const transactions = await getTransactionsForGambler(gamblerId);

        dispatch({
            type: TRANSACTION_LOAD_SUCCESS,
            data: {gamblerId, transactions}
        });
    };
};