import {login, registerUser, Token} from "../api/api";
import jwtDecode from 'jwt-decode';
import {Credentials, UserRegistrationInfo} from "../types";
import {authStore} from "./auth.store";

export const logout = () => {
    authStore.clear();
};

const storeToken = (authToken?: string) => {
    if (!authToken) {
        throw new Error('Invalid token');
    }

    const data: Token = jwtDecode(authToken);
    const tokenValid = !(data.issueDate < Date.now() / 1000);
    if (tokenValid) {
        authStore.saveToken(authToken, data.id);
    }
};

export const authenticate = async (credentials: Credentials) => {
    let { email, password, token } = credentials;
    const auth = await login({ email, password, token });
    const authToken = auth.token;

    storeToken(authToken);
};

export const register = async (userInfo: UserRegistrationInfo) => {
    const auth = await registerUser(userInfo);
    const authToken = auth.token;

    storeToken(authToken);
};






