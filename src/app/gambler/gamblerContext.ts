import createState from 'react-copy-write'

//TODO: Add more properties
export interface GamblerContext {
    id?: string;
    user: any;
    gambler?: any;
}

const initialState = {
    user: {},
    gambler: {}
};

// const gamblerContext = (state: GamblerState = initialState, action: any) => {
//     switch (action.type) {
//         case LOAD_GAMBLER_AND_LEAGUE:
//             return { ...state, loading: true };
//         case GAMBLER_LOAD_SUCCESS:
//             return { ...state, loading: false, ...action.data.gambler };
//         case GAMBLER_LOAD_FAILURE:
//             return { ...state, loading: false };
//         default:
//             return state;
//     }
// };

const {
    Provider,
    Consumer,
    mutate,
} = createState(initialState);

export { Provider as GamblerProvider, Consumer as GamblerConsumer, mutate }
