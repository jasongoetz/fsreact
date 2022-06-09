import {createContext, useContext} from 'react';
import {cartStore} from "../cart/cart.store";
import {betStore} from "../bets/bet.store";
import {leagueStore} from "../league/league.store";
import {gamblerStore} from "../gambler/gambler.store";
import {userStore} from "../user/user.store";
import {authStore} from "../auth/auth.store";
import {errorStore} from "../error/error.store";
import {transactionsStore} from "../transactions/transactions.store";
import {inviteStore} from "../invite/invite.store";
import {adminStore} from "../admin/admin.store";
import {scoresStore} from "../scores/scores.store";

export const globalContext = createContext({
    adminStore,
    authStore,
    betStore,
    cartStore,
    errorStore,
    gamblerStore,
    inviteStore,
    leagueStore,
    scoresStore,
    transactionsStore,
    userStore,
});

export const useGlobalStores = () => useContext(globalContext);
