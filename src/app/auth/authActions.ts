import {login, Token} from "../api/api";
import jwtDecode from 'jwt-decode';
import {Credentials} from "./authModels";
import {mutate} from "../auth/authContext";

export const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    mutate(draft => {
        draft.authenticated = false;
        draft.token = undefined;
        draft.userId = undefined;
    });
};

export const authenticate = async (credentials: Credentials) => {
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

    mutate(draft => {
        draft.loading = false;
        draft.authenticated = true;
        draft.token = authToken;
        draft.userId = data.id;
    });
};



