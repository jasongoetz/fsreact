import {login, Token} from "../api/api";
import {State} from "../App";
import jwtDecode from 'jwt-decode';
import { ThunkAction } from 'redux-thunk';
import {AnyAction} from "redux";
import {Credentials} from "./authModels";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export interface LOGIN_ACTION {
    type: typeof LOGIN_SUCCESS;
    token: string;
    data: Credentials;
}

export const logout = (): ThunkAction<void, State, void, AnyAction> => dispatch => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    dispatch({
        type: LOGOUT_SUCCESS,
    })
};

export const authenticate = (credentials: Credentials): ThunkAction<void, State, void, AnyAction> => {
    return async dispatch => {
        let { email, password, token } = credentials;
        const auth = await login({ email, password, token });
        const authToken = auth.token;

        if (!authToken) {
            throw new Error('Invalid token');
        }

        const data: Token = jwtDecode(authToken);
        const tokenValid = !(data.issueDate < Date.now() / 1000);
        if (tokenValid) {
            localStorage.setItem('token', authToken);
            sessionStorage.setItem('token', authToken);
        }

        dispatch({
            type: LOGIN_SUCCESS,
            token: authToken,
            data: data
        });
    };
};



