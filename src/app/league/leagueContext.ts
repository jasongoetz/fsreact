import createState from 'react-copy-write';
import {League, Bet, GamblerInfo, Parlay} from "../types";

export interface LeagueInvite {
    id: number;
    email: string;
    user: number;
    league: number;
}

export interface LeagueInfo extends League {
    gamblers: GamblerInfo[];
    invites: LeagueInvite[];
    topBets: {
        bets: Bet[];
        parlays: Parlay[];
    }
}

export interface LeagueContext {
    league: LeagueInfo;
}

//TODO: Type this
const initialState = {
    league: {
        gamblers: [],
        invites: [],
        topBets: {bets: [], parlays: []}
    }
};

// const leagueContext = (state = initialState, action: any) => {
//     switch (action.type) {
//         case INVITE_SUCCESS:
//             return { ...state, invites: [...state.invites, action.data]};
//         case REVOKE_INVITE_SUCCESS:
//             const invites = state.invites.filter((invite: LeagueInvite) => invite.id !== action.data.inviteId);
//             return { ...state, invites };
//         case LOAD_GAMBLER_AND_LEAGUE:
//             return { ...state, loading: true };
//         case GAMBLER_LOAD_SUCCESS:
//             return { ...state, loading: false, ...action.data.league };
//         case GAMBLER_LOAD_FAILURE:
//             return { ...state, loading: false };
//         default:
//             return state;
//     }
// };

const {
    Provider,
    Consumer,
    mutate,
} = createState(initialState);

export { Provider as LeagueProvider, Consumer as LeagueConsumer, mutate }
