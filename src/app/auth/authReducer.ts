import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './authActions';
import { User } from "../types";

export type State = {
    authenticated: boolean;
    token?: string;
    userId?: number;
    loading: boolean;
};

const INITIAL_STATE: State = {
    authenticated: false,
    loading: false
};

const authReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case LOGIN:
            console.log("LOGGING IN...");
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            console.log("SUCCESS");
            return { ...state, loading: false, authenticated: true, token: action.token, userId: action.data.id };
        case LOGIN_FAILURE:
            console.log("FAILURE");
            return { ...state, loading: false, error: "Error while logging in" };
        default:
            return state;
    }
};

export default authReducer;