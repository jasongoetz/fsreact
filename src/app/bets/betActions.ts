import {State} from "../App";
import { ThunkAction } from 'redux-thunk';
import {AnyAction} from "redux";
import {getBetsForLeague} from "../api/api";
import {getLeague} from "../league/leagueSelector";

export const LOAD_BETS = "LOAD_BETS";
export const BETS_LOAD_SUCCESS = "BETS_LOAD_SUCCESS";
export const BETS_LOAD_FAILURE = "BETS_LOAD_FAILURE";

export const loadBets = (): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const league = getLeague(getState());
        const bets = await getBetsForLeague(league.id);

        dispatch({
            type: BETS_LOAD_SUCCESS,
            data: bets
        });
    };
};


