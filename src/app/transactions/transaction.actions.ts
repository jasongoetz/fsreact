import {getTransactionsForGambler} from "../api/api";
import {transactionsStore} from "./transactions.store";
import {BetOrParlayWrapper} from "../types";

export const loadTransactions = async (gamblerId) => {
    const transactions: BetOrParlayWrapper[] = await getTransactionsForGambler(gamblerId);
    transactionsStore.addGamblerTransactions(gamblerId, transactions);
};
