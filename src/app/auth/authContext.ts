import createState from 'react-copy-write'
import {decodeToken, isTokenValid} from "../auth/authUtil";

export type AuthContext = {
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
    localStorage.setItem('token', token);
}

const tokenValid = isTokenValid(token);

let initialState: AuthContext = {
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

// const authReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//         case LOGIN:
//             return { ...state, loading: true };
//         case LOGIN_SUCCESS:
//             return { ...state, loading: false, authenticated: true, token: action.token, userId: action.data.id };
//         case LOGIN_FAILURE:
//             return { ...state, loading: false, error: "Error while logging in" };
//         case LOGOUT_SUCCESS:
//             return { ...state, loading: false, authenticated: false, token: null, userId: null };
//         default:
//             return state;
//     }
// };

const {
    Provider,
    Consumer,
    mutate,
} = createState<AuthContext>(initialState);

export { Provider as AuthProvider, Consumer as AuthConsumer, mutate }
