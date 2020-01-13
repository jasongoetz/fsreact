import {State} from "../App";
import { ThunkAction } from 'redux-thunk';
import {AnyAction} from "redux";
import {getUserContext} from "../api/api";
import {getUserId} from "../auth/authSelector";
import {handleHTTPError} from "../error/errorActions";

export const LOAD_GAMBLER_AND_LEAGUE = "LOAD_GAMBLER_AND_LEAGUE";
export const GAMBLER_LOAD_SUCCESS = "GAMBLER_LOAD_SUCCESS"; //TODO: Need an action and reducers more fitting to this whole context load
export const GAMBLER_LOAD_FAILURE = "GAMBLER_LOAD_FAILURE";

export const loadUserContext = (): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const userId = getUserId(getState());

        try {
            const userContext = await getUserContext(userId);

            dispatch({
                type: GAMBLER_LOAD_SUCCESS,
                data: userContext
            });
        } catch (error) {
            dispatch(handleHTTPError(error));
        }
    };
};




