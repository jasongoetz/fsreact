import {decodeToken, isTokenValid} from "../auth/authUtil";
import {action, observable} from "mobx";

//This aligns with what is encoded into the token on back end
export type Token = {
    id: number,
    issued: number,
    expires: number,
};

const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';

if (token) {
    sessionStorage.setItem('token', token);
    localStorage.setItem('token', token);
}

class AuthStore {
    @observable loading: boolean = false;
    @observable authenticated: boolean = false;
    @observable token?: string;
    @observable userId?: number;

    constructor() {
        const tokenValid = isTokenValid(token);
        if (tokenValid) {
            const data = decodeToken(token);
            this.token = token;
            this.userId = data.id;
            this.authenticated = true;
        }
    }

    @action
    clear = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        this.authenticated = false;
        this.token = undefined;
        this.userId = undefined;
    };

    @action
    saveToken = (authToken: string, userId: number) => {
        localStorage.setItem('token', authToken);
        sessionStorage.setItem('token', authToken);

        this.loading = false;
        this.authenticated = true;
        this.token = authToken;
        this.userId = userId;
    };
}

export const authStore = new AuthStore();
