import jwtDecode from "jwt-decode";
import {Token} from "../auth/authContext";

export const decodeToken = (token: string) => jwtDecode<Token>(token);

export const isTokenValid = (token: string) => {
    try {
        const data = decodeToken(token);
        return !(data.expires < Date.now() / 1000);
    } catch (e) {
        return false;
    }
};
