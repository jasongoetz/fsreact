import {getTransactionsForGambler} from "../api/api";
import {transactionsStore} from "./transactions.store";

export const loadTransactions = async (gamblerId) => {
    const transactions = await getTransactionsForGambler(gamblerId);
    transactionsStore.addGamblerTransactions(gamblerId, transactions);
};
