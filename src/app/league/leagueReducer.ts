
import { GAMBLER_LOAD_SUCCESS, GAMBLER_LOAD_FAILURE, LOAD_GAMBLER_AND_LEAGUE } from '../user/userActions';
import {User, Gambler, League, Bet, GamblerInfo, Parlay} from "../types";

export interface LeagueContext extends League {
    gamblers: GamblerInfo[];
    invites: any[]; //TODO: Fix
    topBets: {
        bets: Bet[];
        parlays: Parlay[];
    }
}

const initialState = {
    gamblers: [],
    invites: [],
    topBets: {bets: [], parlays: []}
};

const leagueReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOAD_GAMBLER_AND_LEAGUE:
            return { ...state, loading: true };
        case GAMBLER_LOAD_SUCCESS:
            return { ...state, loading: false, ...action.data.league };
        case GAMBLER_LOAD_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default leagueReducer;