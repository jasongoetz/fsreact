import createState from 'react-copy-write'

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    loading: boolean;
    error: string;
};

export interface UserContext {
    user?: User;
}

// const userReducer = (state = {}, action: any) => {
//     switch (action.type) {
//         case LOAD_GAMBLER_AND_LEAGUE:
//             return { ...state, loading: true };
//         case GAMBLER_LOAD_SUCCESS:
//             return { ...state, loading: false, ...action.data.user };
//         case GAMBLER_LOAD_FAILURE:
//             return { ...state, loading: false };
//         case USER_UPDATE_SUCCESS:
//             return { ...state, loading: false, ...action.data.user };
//         default:
//             return state;
//     }
// };


const {
    Provider,
    Consumer,
    mutate,
} = createState<UserContext>({user: {}});

export { Provider as UserProvider, Consumer as UserConsumer, mutate }
