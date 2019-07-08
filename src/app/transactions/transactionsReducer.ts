import {TRANSACTION_LOAD_SUCCESS} from "./transactionActions";

const initialState = {
    transactionsByGambler: {},
};

const transactionsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TRANSACTION_LOAD_SUCCESS:
            let transactionsByGambler = {...state.transactionsByGambler, [action.data.gamblerId]: action.data.transactions};
            return {...state, transactionsByGambler };
        default:
            return state;
    }
};

export default transactionsReducer;