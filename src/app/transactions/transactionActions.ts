import {getTransactionsForGambler} from "../api/api";
import {mutate, TransactionsContext} from "./transactionsContext";

export const loadTransactions = async (gamblerId) => {
    const transactions = await getTransactionsForGambler(gamblerId);
    mutate((draft: TransactionsContext) => {
        draft.transactionsByGambler[gamblerId] = transactions;
    });
};
