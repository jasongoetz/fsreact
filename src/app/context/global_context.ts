import {createContext, useContext} from 'react';
import {bettableStore} from '../bettables/bettable.store';
import {cartStore} from "../cart/cart.store";
import {betStore} from "../bets/bet.store";
import {leagueStore} from "../league/league.store";
import {gamblerStore} from "../gambler/gambler.store";
import {userStore} from "../user/user.store";
import {authStore} from "../auth/auth.store";
import {errorStore} from "../error/error.store";
import {transactionsStore} from "../transactions/transactions.store";

export const globalContext = createContext({
    bettableStore,
    betStore,
    cartStore,
    leagueStore,
    gamblerStore,
    userStore,
    authStore,
    errorStore,
    transactionsStore,
});

export const useGlobalStores = () => useContext(globalContext);
