
import { LOAD_GAMES, GAMES_LOAD_SUCCESS, GAMES_LOAD_FAILURE } from '../bettables/bettableActions';

export type Bettable = {
    id: number;
    gameKey: string;
    gameTime: string;
    sideId1: string;
    sideId2: string;
    team1: string;
    team2: string;
    team1Spread: string;
    team2Spread: string;
    overunder: string;
    ouoff: boolean;
    off: boolean;
};

const initialState = {
    bettables: []
};

const bettableReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOAD_GAMES:
            return { ...state, loading: true };
        case GAMES_LOAD_SUCCESS:
            return { ...state, loading: false, bettables: action.data.bettables };
        case GAMES_LOAD_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default bettableReducer;