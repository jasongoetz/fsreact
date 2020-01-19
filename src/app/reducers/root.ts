import { combineReducers } from 'redux';
import authReducer from '../auth/authReducer';
import userReducer from '../user/userReducer';
import leagueReducer from '../league/leagueReducer';
import { State as AuthState } from '../auth/authReducer';
import gamblerReducer, {GamblerState} from "../gambler/gamblerReducer";
import bettableReducer from "../bettables/bettableReducer";
import transactionsReducer from "../transactions/transactionsReducer";
import betReducer from "../bets/betReducer";
import cartReducer from "../cart/cartReducer";
import errorReducer, {ErrorState} from "../error/errorReducer";

export interface State {
    auth: AuthState;
    gambler: GamblerState;
    error: ErrorState;
}

const rootReducer = combineReducers({
    auth: authReducer,
    bet: betReducer,
    cart: cartReducer,
    user: userReducer,
    gambler: gamblerReducer,
    bettable: bettableReducer,
    league: leagueReducer,
    transactions: transactionsReducer,
    error: errorReducer,
});

export default rootReducer;