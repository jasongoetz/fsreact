import {State} from "../App";
import { ThunkAction } from 'redux-thunk';
import {AnyAction} from "redux";
import {getGamesForSport} from "../api/api";
import {getLeague} from "../league/leagueSelector";
import {Sport} from "../types";

export const LOAD_GAMES = "LOAD_GAMES";
export const GAMES_LOAD_SUCCESS = "GAMES_LOAD_SUCCESS";
export const GAMES_LOAD_FAILURE = "GAMES_LOAD_FAILURE";

export const loadGames = (sport: Sport): ThunkAction<void, State, void, AnyAction> => {
    return async (dispatch) => {
        const games = await getGamesForSport(sport);
        dispatch({
            type: GAMES_LOAD_SUCCESS,
            data: games
        });
    };
};



