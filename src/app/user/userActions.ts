import {State} from "../App";
import { ThunkAction } from 'redux-thunk';
import {AnyAction} from "redux";
import {getUserContext, updateUser, updateUserPass} from "../api/api";
import {getUserId} from "../auth/authSelector";
import {handleHTTPError} from "../error/errorActions";
import {UserProfile} from "../types";

export const LOAD_GAMBLER_AND_LEAGUE = "LOAD_GAMBLER_AND_LEAGUE";
export const GAMBLER_LOAD_SUCCESS = "GAMBLER_LOAD_SUCCESS"; //TODO: Need an action and reducers more fitting to this whole context load
export const GAMBLER_LOAD_FAILURE = "GAMBLER_LOAD_FAILURE";

export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";

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

export const updateUserProfile = (user: UserProfile): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const userId = getUserId(getState());
        await updateUser(userId, user);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            data: { user }
        });
    };
};

export const updateUserPassword = (password: string): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const userId = getUserId(getState());
        await updateUserPass(userId, password);
    };
};




