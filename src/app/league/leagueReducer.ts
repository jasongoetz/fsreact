import { GAMBLER_LOAD_SUCCESS, GAMBLER_LOAD_FAILURE, LOAD_GAMBLER_AND_LEAGUE } from '../user/userActions';
import {League, Bet, GamblerInfo, Parlay} from "../types";
import {INVITE_SUCCESS, REVOKE_INVITE_SUCCESS} from "./leagueActions";

interface LeagueInvite {
    id: number;
    email: string;
    user: number;
    league: number;
}

export interface LeagueContext extends League {
    gamblers: GamblerInfo[];
    invites: LeagueInvite[];
    topBets: {
        bets: Bet[];
        parlays: Parlay[];
    }
}

//TODO: Type this
const initialState = {
    gamblers: [],
    invites: [],
    topBets: {bets: [], parlays: []}
};

const leagueReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case INVITE_SUCCESS:
            return { ...state, invites: [...state.invites, action.data]};
        case REVOKE_INVITE_SUCCESS:
            const invites = state.invites.filter((invite: LeagueInvite) => invite.id !== action.data.inviteId);
            return { ...state, invites };
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