import jwtDecode from 'jwt-decode';

import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS} from './authActions';
import { User } from "../types";
import {decodeToken, isTokenValid} from "./authUtil";

export type State = {
    authenticated: boolean;
    token?: string;
    userId?: number;
    loading: boolean;
};

//This aligns with what is encoded into the token on back end
export type Token = {
    id: number,
    issued: number,
    expires: number,
};

const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';

if (token) {
    sessionStorage.setItem('token', token);
}

const tokenValid = isTokenValid(token);

let initialState: State = {
    authenticated: false,
    loading: false
};

if (tokenValid) {
    const data = decodeToken(token);

    initialState = {
        loading: false,
        authenticated: true,
        token: token,
        userId: data.id
    };
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, authenticated: true, token: action.token, userId: action.data.id };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: "Error while logging in" };
        case LOGOUT_SUCCESS:
            return { ...state, loading: false, authenticated: false, token: null, userId: null };
        default:
            return state;
    }
};

export default authReducer;