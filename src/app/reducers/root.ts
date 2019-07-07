import { combineReducers } from 'redux';
import authReducer from '../auth/authReducer';
import userReducer from '../user/userReducer';
import leagueReducer from '../league/leagueReducer';
import { State as AuthState } from '../auth/authReducer';
import gamblerReducer from "../gambler/gamblerReducer";
import bettableReducer from "../bettables/bettableReducer";

export interface State {
    auth: AuthState;
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    gambler: gamblerReducer,
    bettable: bettableReducer,
    league: leagueReducer,
});

export default rootReducer;