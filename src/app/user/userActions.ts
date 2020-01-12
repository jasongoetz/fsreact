import {State} from "../App";
import { ThunkAction } from 'redux-thunk';
import {AnyAction} from "redux";
import {getUserContext, postInvite} from "../api/api";
import {getUserId} from "../auth/authSelector";
import {handleHTTPError} from "../error/errorActions";
import {LeagueContext} from "../league/leagueReducer";

export const LOAD_GAMBLER_AND_LEAGUE = "LOAD_GAMBLER_AND_LEAGUE";
export const GAMBLER_LOAD_SUCCESS = "GAMBLER_LOAD_SUCCESS";
export const GAMBLER_LOAD_FAILURE = "GAMBLER_LOAD_FAILURE";

export const INVITE_SUCCESS = "INVITE_SUCCESS";

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

export const inviteUser = (email: string, league: LeagueContext) => {
    return async (dispatch) => {
        try {
            const invitedUser = await postInvite(league.id, email);

            dispatch({
                type: INVITE_SUCCESS,
                data: invitedUser
            });
        } catch (error) {
            dispatch(handleHTTPError(error));
        }
    };
};



