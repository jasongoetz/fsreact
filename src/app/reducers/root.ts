import { combineReducers } from 'redux';
import authReducer from '../auth/authReducer';
import { State as AuthState } from '../auth/authReducer';

export interface State {
    auth: AuthState;
}

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;