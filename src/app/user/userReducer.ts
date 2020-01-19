
import {GAMBLER_LOAD_SUCCESS, GAMBLER_LOAD_FAILURE, LOAD_GAMBLER_AND_LEAGUE, USER_UPDATE_SUCCESS} from './userActions';

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    loading: boolean;
    error: string;
};

const userReducer = (state = {}, action: any) => {
    switch (action.type) {
        case LOAD_GAMBLER_AND_LEAGUE:
            return { ...state, loading: true };
        case GAMBLER_LOAD_SUCCESS:
            return { ...state, loading: false, ...action.data.user };
        case GAMBLER_LOAD_FAILURE:
            return { ...state, loading: false };
        case USER_UPDATE_SUCCESS:
            return { ...state, loading: false, ...action.data.user };
        default:
            return state;
    }
};

export default userReducer;