import {State} from "../App";
import { ThunkAction } from 'redux-thunk';
import {AnyAction} from "redux";
import {getGamesForSport} from "../api/api";
import {getLeague} from "../league/leagueSelector";

export const LOAD_GAMES = "LOAD_GAMES";
export const GAMES_LOAD_SUCCESS = "GAMES_LOAD_SUCCESS";
export const GAMES_LOAD_FAILURE = "GAMES_LOAD_FAILURE";

export const loadGames = (): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch, getState) => {
        const league = getLeague(getState());
        const games = await getGamesForSport(league.sport);

        dispatch({
            type: GAMES_LOAD_SUCCESS,
            data: games
        });
    };
};



