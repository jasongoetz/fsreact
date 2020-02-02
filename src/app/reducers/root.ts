import {combineReducers} from 'redux';
import bettableReducer from "../bettables/bettableReducer";
import transactionsReducer from "../transactions/transactionsReducer";
import betReducer from "../bets/betReducer";
import cartReducer from "../cart/cartReducer";

export interface State {
}

const rootReducer = combineReducers({
    bet: betReducer,
    cart: cartReducer,
    bettable: bettableReducer,
    transactions: transactionsReducer,
});

export default rootReducer;
