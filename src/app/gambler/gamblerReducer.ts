
import { GAMBLER_LOAD_SUCCESS, GAMBLER_LOAD_FAILURE, LOAD_GAMBLER_AND_LEAGUE } from '../user/userActions';
import { User, Gambler, League } from "../types";

export interface GamblerState {
    id?: string;
    user: any;
}

const initialState: GamblerState = {
    user: {},
};

const gamblerReducer = (state: GamblerState = initialState, action: any) => {
    switch (action.type) {
        case LOAD_GAMBLER_AND_LEAGUE:
            return { ...state, loading: true };
        case GAMBLER_LOAD_SUCCESS:
            return { ...state, loading: false, ...action.data.gambler };
        case GAMBLER_LOAD_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default gamblerReducer;